import { z } from 'zod';
export const safeUrl=(v:string)=>{try{return new URL(v).protocol==='https:'}catch{return false}};
export const WorkspaceSchema=z.object({
 overlays:z.record(z.object({status:z.string().max(80),notes:z.string().max(12000),nextAction:z.string().max(4000),owner:z.string().max(200),due:z.string().max(40),pr:z.string().max(1000),recalc:z.string().max(80),updatedAt:z.string().max(80)})),
 checks:z.array(z.object({id:z.string().max(300),title:z.string().max(1000),status:z.enum(['OPEN','IN_PROGRESS','BLOCKED','DONE','CLOSED_FOR_CUTOFF']),context:z.string().max(12000),nextAction:z.string().max(4000),owner:z.string().max(200),due:z.string().max(40),links:z.string().max(4000),updatedAt:z.string().max(80)})).max(1000),
 reports:z.array(z.object({id:z.string().max(300),date:z.string().max(40),type:z.enum(['daily','weekly']),path:z.string().max(1000),status:z.string().max(80),sha:z.string().max(80)})).max(1000),
 checklist:z.record(z.array(z.string().max(120)).max(20)),
 calendar:z.array(z.object({id:z.string().max(300),date:z.string().max(40),priority:z.enum(['HIGH','CRITICAL']),entity:z.string().max(300),title:z.string().max(1000),url:z.string().max(2000),kind:z.enum(['PLANNED','CONFIRMED']),time:z.string().max(80)})).max(1000),
 imports:z.array(z.object({id:z.string().max(300),name:z.string().max(300),importedAt:z.string().max(80),kind:z.enum(['registry','calculation']),data:z.any()})).max(100),
 reviews:z.array(z.object({id:z.string().max(300),target:z.string().max(300),decision:z.string().max(80),reason:z.string().max(12000),reviewedAt:z.string().max(80),reviewer:z.string().max(200),recalc:z.string().max(80),source:z.string().max(4000)})).max(1000)
});
export type Workspace=z.infer<typeof WorkspaceSchema>;
export const emptyWorkspace=():Workspace=>({overlays:{},checks:[],reports:[],checklist:{},calendar:[],imports:[],reviews:[]});
export function isAppendOnly(old:Workspace,next:Workspace){
 for(const key of ['imports','reviews'] as const){if(next[key].length<old[key].length)return false;for(let i=0;i<old[key].length;i++)if(JSON.stringify(old[key][i])!==JSON.stringify(next[key][i]))return false;}
 return true;
}
export const gates=['source','timing','dedup','registry','factors','completeness','calculation','ci','review','merge'];
export function reportReady(checks:string[],status:string){return status==='COMPLETE'&&gates.every(g=>checks.includes(g));}
export function calcRow(data:any){const r=data.published_result||data.evaluation; if(!r)throw Error('Expected a canonical published_result or evaluation artifact');
 const asof=data.cutoff||data.trigger_review_at||r.as_of||data.snapshot?.as_of;
 if(!asof||!Number.isFinite(Date.parse(asof)))throw Error('Calculation cutoff missing');
 if(r.calibration!=='UNCALIBRATED'||r.trading_signal!==false)throw Error('Research-only fields missing');
 if(!Array.isArray(r.final_interval)||r.final_interval.length!==2||r.final_interval.some((n:any)=>!Number.isFinite(Number(n))||Number(n)<0||Number(n)>100)||Number(r.final_interval[0])>Number(r.final_interval[1]))throw Error('Invalid calculation interval');
 if(!r.core_factors?.R2||!r.event_adjustments||['R3','R5','R6','R7'].some(k=>r.event_adjustments[k]==null))throw Error('Required components absent; old values cannot fill gaps');
 return {as_of:asof,result:r,snapshot:data.snapshot};
}
