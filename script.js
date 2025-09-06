const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const f=$("#f"),live=$("#live"),cards=$("#cards"),tb=$("#t tbody"),yearBox=$("#yearBox");let id=1;

function setErr(el,id,msg){$("#e-"+id).textContent=msg||"";el?.classList[msg?"add":"remove"]("invalid");}
function valid(){
  let ok=1,first=$("#first"),last=$("#last"),email=$("#email"),prog=$("#prog"),yr=$('input[name="year"]:checked');
  setErr(first,"first",first.value.trim()?"":"First name required"); if(!first.value.trim()) ok=0;
  setErr(last,"last",last.value.trim()?"":"Last name required"); if(!last.value.trim()) ok=0;
  const em=email.value.trim(); setErr(email,"email",(em&&em.includes("@"))?"":"Valid email required"); if(!(em&&em.includes("@"))) ok=0;
  setErr(prog,"prog",prog.value?"":"Choose a programme"); if(!prog.value) ok=0;
  $("#e-year").textContent=yr?"":"Choose a year"; yearBox.classList[yr?"remove":"add"]("invalid"); if(!yr) ok=0;
  live.textContent=ok?"All good.":"Please fix the highlighted errors."; return ok;
}

const cardHTML=d=>`<div class="card" data-id="${d.id}">
<img src="${d.photo||'https://placehold.co/96x96'}" alt="${d.first} ${d.last}">
<h3>${d.first} ${d.last}</h3>
<div class="badge">Programme: ${d.prog}</div>
<div class="meta"><span class="badge">Year ${d.year}</span>${(d.interests.length?d.interests:['-']).map(x=>`<span class="pill">${x}</span>`).join('')}</div>
<button class="rm" type="button">Remove</button></div>`;

const rowHTML=d=>`<tr data-id="${d.id}"><td>${d.first} ${d.last}</td><td>${d.prog}</td><td>${d.year}</td><td>${d.interests.join(", ")||"-"}</td><td><button class="rm" type="button">Remove</button></td></tr>`;

function removeById(i){cards.querySelector(`[data-id="${i}"]`)?.remove();tb.querySelector(`[data-id="${i}"]`)?.remove();live.textContent="Entry removed.";}
cards.addEventListener("click",e=>{if(e.target.classList.contains("rm")) removeById(e.target.closest(".card").dataset.id);});
tb.addEventListener("click",e=>{if(e.target.classList.contains("rm")) removeById(e.target.closest("tr").dataset.id);});

f.onsubmit=e=>{
  e.preventDefault(); if(!valid()) return;
  const data={
    id:id++,
    first:$("#first").value.trim(),
    last:$("#last").value.trim(),
    email:$("#email").value.trim(),
    prog:$("#prog").value,
    year:$('input[name="year"]:checked').value,
    interests:$$('input[name="int"]:checked').map(x=>x.value),
    photo:$("#photo").value.trim()
  };
  cards.insertAdjacentHTML("afterbegin",cardHTML(data));
  tb.insertAdjacentHTML("afterbegin",rowHTML(data));   // stays in table
  live.textContent=`Added ${data.first} ${data.last}.`;
  f.reset(); $("#first").focus();
};
