import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
export {THREE};
export const V3=(x,y,z)=>new THREE.Vector3(x,y,z);
export const clampN=(x,a,b)=>Math.max(a,Math.min(b,x)),lerpN=(a,b,k)=>a+(b-a)*k;
export const sstep=(a,b,x)=>{const t=clampN((x-a)/(b-a),0,1);return t*t*(3-2*t)};
export function rnd(s){return function(){s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const G3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
export function makeNoise(seed){const p=new Uint8Array(256);for(let i=0;i<256;i++)p[i]=i;const r=rnd(seed);for(let i=255;i>0;i--){const j=Math.floor(r()*(i+1));const t=p[i];p[i]=p[j];p[j]=t}
 const perm=new Uint8Array(512),pm=new Uint8Array(512);for(let i=0;i<512;i++){perm[i]=p[i&255];pm[i]=perm[i]%12}const F=1/3,G=1/6;
 const cn=(gi,x,y,z)=>{let t=.6-x*x-y*y-z*z;if(t<0)return 0;const g=G3[gi];t*=t;return t*t*(g[0]*x+g[1]*y+g[2]*z)};
 return function(x,y,z){const s=(x+y+z)*F,i=Math.floor(x+s),j=Math.floor(y+s),k=Math.floor(z+s),t=(i+j+k)*G,x0=x-(i-t),y0=y-(j-t),z0=z-(k-t);let i1,j1,k1,i2,j2,k2;
  if(x0>=y0){if(y0>=z0){i1=1;j1=0;k1=0;i2=1;j2=1;k2=0}else if(x0>=z0){i1=1;j1=0;k1=0;i2=1;j2=0;k2=1}else{i1=0;j1=0;k1=1;i2=1;j2=0;k2=1}}else{if(y0<z0){i1=0;j1=0;k1=1;i2=0;j2=1;k2=1}else if(x0<z0){i1=0;j1=1;k1=0;i2=0;j2=1;k2=1}else{i1=0;j1=1;k1=0;i2=1;j2=1;k2=0}}
  const x1=x0-i1+G,y1=y0-j1+G,z1=z0-k1+G,x2=x0-i2+2*G,y2=y0-j2+2*G,z2=z0-k2+2*G,x3=x0-1+3*G,y3=y0-1+3*G,z3=z0-1+3*G,ii=i&255,jj=j&255,kk=k&255;
  return 32*(cn(pm[ii+perm[jj+perm[kk]]],x0,y0,z0)+cn(pm[ii+i1+perm[jj+j1+perm[kk+k1]]],x1,y1,z1)+cn(pm[ii+i2+perm[jj+j2+perm[kk+k2]]],x2,y2,z2)+cn(pm[ii+1+perm[jj+1+perm[kk+1]]],x3,y3,z3))}}
export function fbm(N,x,y,z,o=4){let s=0,a=.5,f=1,n=0;for(let i=0;i<o;i++){s+=a*N(x*f,y*f,z*f);n+=a;a*=.5;f*=2.03}return s/n}
export function ridged(N,x,y,z,o=4){let s=0,a=.5,f=1,n=0,w=1;for(let i=0;i<o;i++){let v=1-Math.abs(N(x*f,y*f,z*f));v*=v;v*=w;w=clampN(v*1.6,0,1);s+=a*v;n+=a;a*=.5;f*=2.05}return s/n}
/* tileable value noise for textures */
function vnoise2(seed){const r=rnd(seed),H=new Float32Array(4096);for(let i=0;i<4096;i++)H[i]=r();return(x,y,Px,Py)=>{const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi;const h=(a,b)=>H[((((a%Px)+Px)%Px)*73+((((b%Py)+Py)%Py))*1019)&4095];const u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);return lerpN(lerpN(h(xi,yi),h(xi+1,yi),u),lerpN(h(xi,yi+1),h(xi+1,yi+1),u),v)}}
const VN=vnoise2(17);
export function tfbm(x,y,p,o,sx=1,sy=1){let s=0,a=.5,n=0;for(let i=0;i<o;i++){const P=p*2**i;s+=a*VN(x*P*sx,y*P*sy,P*sx,P*sy);n+=a;a*=.5}return s/n}
export function mkTex(size,fn,srgb,rep){const cv=document.createElement('canvas');cv.width=cv.height=size;const c=cv.getContext('2d'),im=c.createImageData(size,size),d=im.data;for(let y=0;y<size;y++)for(let x=0;x<size;x++){const v=fn(x/size,y/size),i=(y*size+x)*4;d[i]=v[0];d[i+1]=v[1];d[i+2]=v[2];d[i+3]=255}c.putImageData(im,0,0);const t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=srgb?THREE.SRGBColorSpace:THREE.NoColorSpace;t.anisotropy=4;if(rep)t.repeat.set(rep,rep);return t}
export function normTex(size,hf,str){const H=new Float32Array(size*size);for(let y=0;y<size;y++)for(let x=0;x<size;x++)H[y*size+x]=hf(x/size,y/size);const g=(x,y)=>H[((y+size)%size)*size+((x+size)%size)];return mkTex(size,(u,v)=>{const x=Math.round(u*size),y=Math.round(v*size);let nx=(g(x-1,y)-g(x+1,y))*str,ny=(g(x,y-1)-g(x,y+1))*str;const l=Math.hypot(nx,ny,1);return[(nx/l*.5+.5)*255,(ny/l*.5+.5)*255,(1/l*.5+.5)*255]},false)}
let TX=null;
export function tex(){if(TX)return TX;TX={};const gray=(f)=>(u,v)=>{const g=Math.round(clampN(f(u,v),0,1)*255);return[g,g,g]};
 TX.organ=mkTex(256,gray((u,v)=>.35+.65*tfbm(u,v,4,5)));
 TX.muscle=mkTex(256,gray((u,v)=>.3+.7*tfbm(u,v,3,4,1,8)));
 TX.fine=mkTex(256,gray((u,v)=>.3+.7*tfbm(u,v,16,3)));
 TX.fur=mkTex(256,gray((u,v)=>.2+.8*tfbm(u,v,24,3,1,3)));
 TX.bark=mkTex(256,gray((u,v)=>.2+.8*tfbm(u,v,4,4,6,1)));
 TX.ground=mkTex(256,(u,v)=>{const n=tfbm(u,v,8,5);const g=Math.round(200+55*n);return[g,g,g]},true);
 TX.waterN=normTex(256,(u,v)=>tfbm(u,v,4,4)+.4*tfbm(u,v,16,2),3);
 TX.rock=mkTex(256,(u,v)=>{const n=tfbm(u,v,6,5),m=tfbm(u+.3,v,3,3);const g=150+90*n;return[g*(m>.62?1.05:1),g,g*(m>.62?.8:1)]},true);
 TX.rust=mkTex(256,(u,v)=>{const n=tfbm(u,v,6,5),m=tfbm(u,v+.5,3,4);return m>.48?[95+60*n,58+35*n,35+20*n]:[78+40*n,72+30*n,66+30*n]},true);
 for(const k in TX)TX[k].userData.keep=true;return TX}
export function deform(g,f){const p=g.attributes.position,v=new THREE.Vector3();for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);f(v,i);p.setXYZ(i,v.x,v.y,v.z)}g.computeVertexNormals();return g}
export function vtube(pts,n,rf,rs=12,closed=false){const curve=pts.getPointAt?pts:new THREE.CatmullRomCurve3(pts.map(p=>Array.isArray(p)?V3(p[0],p[1],p[2]):p),closed,'catmullrom',.5);const g=new THREE.TubeGeometry(curve,n,1,rs,closed);const p=g.attributes.position,v=new THREE.Vector3(),c=new THREE.Vector3();for(let i=0;i<=n;i++){const u=i/n;curve.getPointAt(Math.min(u,1),c);const r=rf(u);for(let j=0;j<=rs;j++){const k=i*(rs+1)+j;v.fromBufferAttribute(p,k).sub(c).multiplyScalar(r).add(c);p.setXYZ(k,v.x,v.y,v.z)}}g.computeVertexNormals();g.userData.curve=curve;return g}
export const col=h=>new THREE.Color(h);
export function colorize(g,fn){g=g.index?g.toNonIndexed():g;const p=g.attributes.position,n=p.count,a=new Float32Array(n*3),c=new THREE.Color();for(let i=0;i<n;i++){fn(p.getX(i),p.getY(i),p.getZ(i),c);a[i*3]=c.r;a[i*3+1]=c.g;a[i*3+2]=c.b}g.setAttribute('color',new THREE.BufferAttribute(a,3));if(!g.attributes.uv)g.setAttribute('uv',new THREE.BufferAttribute(new Float32Array(n*2),2));if(!g.attributes.normal)g.computeVertexNormals();for(const k of Object.keys(g.attributes))if(!['position','normal','uv','color'].includes(k))g.deleteAttribute(k);g.morphAttributes={};return g}
export const solid=(g,hex)=>{const C=col(hex);return colorize(g,(x,y,z,c)=>c.copy(C))};
export const mergeG=l=>mergeGeometries(l,false);
export function plain(g){g=g.index?g.toNonIndexed():g;for(const k of Object.keys(g.attributes))if(!['position','normal','uv'].includes(k))g.deleteAttribute(k);if(!g.attributes.uv)g.setAttribute('uv',new THREE.BufferAttribute(new Float32Array(g.attributes.position.count*2),2));return g}
export const PM=o=>new THREE.MeshPhysicalMaterial(Object.assign({roughness:.5,metalness:0},o));
export function cylBetween(a,b,r,rs=8){const d=new THREE.Vector3().subVectors(b,a),L=d.length();const g=new THREE.CylinderGeometry(r,r,L,rs,1);const q=new THREE.Quaternion().setFromUnitVectors(V3(0,1,0),d.normalize());g.applyQuaternion(q);g.translate((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);return g}
export function xform(g,p=[0,0,0],r=[0,0,0],s=[1,1,1]){g.applyMatrix4(new THREE.Matrix4().compose(V3(...p),new THREE.Quaternion().setFromEuler(new THREE.Euler(...r)),V3(...(Array.isArray(s)?s:[s,s,s]))));return g}
export function leafGeo(L,W,o={}){const su=o.su||22,sv=o.sv||8,pos=[],uv=[],idx=[];const sk=o.sk||.7,fold=o.fold||0,bend=o.bend||0,cup=o.cup||0;
 for(let i=0;i<=su;i++){const u=i/su;let w=W*Math.pow(Math.sin(Math.PI*Math.pow(u,sk)),.85);if(o.serr)w*=1+o.serr*Math.abs(Math.sin(u*o.serrN));if(o.base)w=Math.max(w,o.base*(1-u));for(let j=0;j<=sv;j++){const v=j/sv*2-1,x=v*w;let zf=-fold*Math.abs(x)+cup*(x*x)/(W*W+1e-6)*W;const s=u*L,a=bend*u*u;pos.push(x,s*Math.cos(a)-zf*Math.sin(a),s*Math.sin(a)+zf*Math.cos(a));uv.push(v*.5+.5,u)}}
 for(let i=0;i<su;i++)for(let j=0;j<sv;j++){const a=i*(sv+1)+j,b=a+sv+1;idx.push(a,b,a+1,b,b+1,a+1)}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g}
export function canvasTex(w,h,draw,srgb=true){const k=w*h<=65536?3:w*h<=262144?2:1;const cv=document.createElement('canvas');cv.width=w*k;cv.height=h*k;const cx=cv.getContext('2d');cx.scale(k,k);draw(cx,w,h);const t=new THREE.CanvasTexture(cv);t.colorSpace=srgb?THREE.SRGBColorSpace:THREE.NoColorSpace;t.anisotropy=8;return t}
export function leafTex(c1,c2,vein,n=11){return canvasTex(256,512,(c,w,h)=>{const g=c.createLinearGradient(0,0,w,0);g.addColorStop(0,c1);g.addColorStop(.5,c2);g.addColorStop(1,c1);c.fillStyle=g;c.fillRect(0,0,w,h);const r=rnd(3);for(let i=0;i<5000;i++){c.fillStyle=`rgba(${r()<.5?0:255},${r()<.5?40:255},0,${r()*.05})`;c.fillRect(r()*w,r()*h,2,2)}c.strokeStyle=vein;c.lineCap='round';c.lineWidth=7;c.beginPath();c.moveTo(w/2,h);c.lineTo(w/2,0);c.stroke();c.lineWidth=2.4;for(let i=1;i<n;i++){const y=h-i*h/n;[-1,1].forEach(s=>{c.beginPath();c.moveTo(w/2,y);c.quadraticCurveTo(w/2+s*w*.22,y-h*.04,w/2+s*w*.5,y-h*.13);c.stroke()})}c.globalAlpha=.35;c.lineWidth=.9;for(let i=0;i<260;i++){const x=r()*w,y=r()*h;c.beginPath();c.moveTo(x,y);c.lineTo(x+(r()-.5)*18,y+(r()-.5)*18);c.stroke()}})}
export function disposeTree(o){o.traverse(m=>{if(m.geometry)m.geometry.dispose();if(m.material){(Array.isArray(m.material)?m.material:[m.material]).forEach(x=>{for(const k in x){const v=x[k];if(v&&v.isTexture&&!v.userData.keep)v.dispose()}x.dispose()})}})}
