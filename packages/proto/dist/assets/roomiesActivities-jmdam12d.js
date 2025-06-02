import{i as y,x as l,r as m,a as u,d as b,b as P}from"./reset.css-GlY_cqLy.js";import{N as _}from"./nav-bar-B3sAA9Ka.js";import{F as w}from"./friend-nav-CMvY1LuW.js";import{n as c}from"./property-BE6-Eo5M.js";import{r as k}from"./state-_RpdubKC.js";import{P as x}from"./page-header-CT2ts7P7.js";var j=Object.defineProperty,d=(s,t,i,$)=>{for(var e=void 0,r=s.length-1,o;r>=0;r--)(o=s[r])&&(e=o(t,i,e)||e);return e&&j(t,i,e),e};const f=class f extends y{constructor(){super(...arguments),this.activity="Add Activity",this.location="",this.notes=""}render(){return l`
      <div class="card-container">
        <span class="activity-text">${this.activity}</span>
        <span class="activity-text">${this.location}</span>
        <span class="notes">${this.notes}</span>
      </div>
    `}};f.styles=[m.styles,u`
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
    `];let a=f;d([c()],a.prototype,"activity");d([c()],a.prototype,"location");d([c()],a.prototype,"notes");var z=Object.defineProperty,g=(s,t,i,$)=>{for(var e=void 0,r=s.length-1,o;r>=0;r--)(o=s[r])&&(e=o(t,i,e)||e);return e&&z(t,i,e),e};const p=class p extends y{constructor(){super(...arguments),this.activities=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){fetch(t).then(i=>{if(!i.ok)throw new Error(`Failed to load ${t}`);return i.json()}).then(i=>{this.activities=i}).catch(i=>{console.error(i)})}renderActivity(t){return l`
      <activity-card
        activity=${t.activity}
        location=${t.location}
        notes=${t.notes}
      ></activity-card>
    `}render(){return l`
      <div class="card-col">
        ${this.activities.map(t=>this.renderActivity(t))}
      </div>
    `}};p.styles=[m.styles,u`
      .card-col {
      display: flex;
      flex-direction: column;
      gap: 32px;

      }
    `];let n=p;g([c()],n.prototype,"src");g([k()],n.prototype,"activities");b({"wtm-nav":_,"friend-nav":w,"activity-card":a,"activity-list":n,"page-header":x,"mu-auth":P.Provider});var v,h;(h=(v=x).initializeOnce)==null||h.call(v);
