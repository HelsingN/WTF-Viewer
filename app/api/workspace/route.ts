import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../../chatgpt-auth';
import { emptyWorkspace, WorkspaceSchema, isAppendOnly, reportReady, calcRow } from '@/lib/workspace';
export const dynamic='force-dynamic';
const reply=(v:unknown,status=200)=>Response.json(v,{status,headers:{'Cache-Control':'private, no-store'}});
async function owner(){const u=await getChatGPTUser();return u?.userId||(process.env.NODE_ENV==='development'?'local-preview':null);}
export async function GET(){try{
 const id=await owner();if(!id)return reply({error:'Sign in with ChatGPT to load your workspace.'},401);
 const row=await env.DB!.prepare('SELECT revision,payload,updated_at FROM workspaces WHERE owner=?').bind(id).first<any>();
 const audit=await env.DB!.prepare('SELECT revision,action,created_at FROM workspace_versions WHERE owner=? ORDER BY revision DESC LIMIT 30').bind(id).all();
 return reply({revision:row?.revision||0,state:row?.revision?JSON.parse(row.payload):emptyWorkspace(),updatedAt:row?.updated_at,audit:audit.results});
 }catch{return reply({error:'Workspace is unavailable. Unsaved changes have been kept in this browser.'},503);}}
export async function POST(req:Request){try{
 const id=await owner();if(!id)return reply({error:'Sign in with ChatGPT to save.'},401);
 if(req.headers.get('origin')!==new URL(req.url).origin)return reply({error:'Origin rejected'},403);
 if(Number(req.headers.get('content-length')||0)>3_000_000)return reply({error:'Workspace too large'},413);
 const raw=await req.text();if(raw.length>3_000_000)return reply({error:'Workspace too large'},413);
 const body=JSON.parse(raw);const state=WorkspaceSchema.parse(body.state);
 if(!Number.isSafeInteger(body.revision)||body.revision<0||typeof body.action!=='string'||body.action.length>500)return reply({error:'Invalid revision or action'},400);
 for(const [key,overlay] of Object.entries(state.overlays)){if(overlay.status==='COMPLETE'&&!reportReady(state.checklist[key]||[],overlay.status))return reply({error:'COMPLETE requires all report checkpoints'},400);}
 for(const im of state.imports){if(im.kind==='registry'&&(!Array.isArray(im.data?.events)||im.data.events.length>1000))return reply({error:'Invalid registry import'},400);}
 for(const im of state.imports){if(im.kind==='calculation')calcRow(im.data);}
 const row=await env.DB!.prepare('SELECT revision,payload FROM workspaces WHERE owner=?').bind(id).first<any>();
 if((row?.revision||0)!==body.revision)return reply({error:'Another tab saved a newer revision. Export this draft, then reload before continuing.'},409);
 const old=row?.revision?WorkspaceSchema.parse(JSON.parse(row.payload)):emptyWorkspace();
 if(!isAppendOnly(old,state))return reply({error:'Imported evidence and review history are append-only.'},400);
 const now=new Date().toISOString(), payload=JSON.stringify(state);
 const result=await env.DB!.batch([
 env.DB!.prepare('INSERT OR IGNORE INTO workspaces (owner,revision,payload,updated_at) VALUES (?,0,?,?)').bind(id,'{}',now),
 env.DB!.prepare('UPDATE workspaces SET revision=revision+1,payload=?,updated_at=? WHERE owner=? AND revision=?').bind(payload,now,id,body.revision),
 env.DB!.prepare('INSERT INTO workspace_versions (owner,revision,payload,action,created_at) SELECT owner,revision,payload,?,? FROM workspaces WHERE owner=? AND changes()=1').bind(body.action,now,id)
 ]);
 if(result[1].meta.changes!==1)return reply({error:'Revision conflict. Export draft and reload.'},409);
 return reply({revision:body.revision+1,updatedAt:now});
 }catch(e){return reply({error:e instanceof Error&&e.name==='ZodError'?'Invalid workspace fields':'Save failed. Your draft is still available.'},400);}}
