import{i as v,x as l,r as h,a as y,d as x}from"./reset.css-DKZOVmhf.js";import{N as g}from"./nav-bar-BFMUx67p.js";import{F as $}from"./friend-nav-CmpZ41Qr.js";import{n as c}from"./property-DdMkXYOi.js";import{r as b}from"./state-pgoaCIgN.js";var _=Object.defineProperty,d=(s,t,i,u)=>{for(var e=void 0,r=s.length-1,o;r>=0;r--)(o=s[r])&&(e=o(t,i,e)||e);return e&&_(t,i,e),e};const f=class f extends v{constructor(){super(...arguments),this.activity="Add Activity",this.location="",this.notes=""}render(){return l`
      <div class="card-container">
        <span class="activity-text">${this.activity}</span>
        <span class="activity-text">${this.location}</span>
        <span class="notes">${this.notes}</span>
      </div>
    `}};f.styles=[h.styles,y`
      .card-container {
        display: flex;
        padding: 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 18px;
        align-self: stretch;
        border-radius: 16px;
        background-color: var(--color-bg-nav);
      }
      .activity-text {
        font-family: var(--font-body);
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .notes {
        color: #fff;
        font-family: var(--font-body);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    `];let a=f;d([c()],a.prototype,"activity");d([c()],a.prototype,"location");d([c()],a.prototype,"notes");var w=Object.defineProperty,m=(s,t,i,u)=>{for(var e=void 0,r=s.length-1,o;r>=0;r--)(o=s[r])&&(e=o(t,i,e)||e);return e&&w(t,i,e),e};const p=class p extends v{constructor(){super(...arguments),this.activities=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){fetch(t).then(i=>{if(!i.ok)throw new Error(`Failed to load ${t}`);return i.json()}).then(i=>{this.activities=i}).catch(i=>{console.error(i)})}renderActivity(t){return l`
      <activity-card
        activity=${t.activity}
        location=${t.location}
        notes=${t.notes}
      ></activity-card>
    `}render(){return l`
      <div class="card-col">
        ${this.activities.map(t=>this.renderActivity(t))}
      </div>
    `}};p.styles=[h.styles,y`
      .card-col {
      display: flex;
      flex-direction: column;
      gap: 32px;

      }
    `];let n=p;m([c()],n.prototype,"src");m([b()],n.prototype,"activities");x({"wtm-nav":g,"friend-nav":$,"activity-card":a,"activity-list":n});
