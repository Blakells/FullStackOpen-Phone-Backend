(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),o=t.n(c),u=t(2),l=t(3),i=t.n(l),m="/api/persons",d=function(){return i.a.get(m).then((function(e){return e.data}))},s=function(e){i.a.post(m,e).then((function(e){return e.data})).catch((function(e){console.log(e.response.data)}))},f=function(e){return i.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))},h=function(e){return i.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},b=function(e){var n=e.persons,t=e.setPersons;return r.a.createElement("div",null,r.a.createElement("ul",null,n.map((function(e,a){return r.a.createElement("li",{key:a},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return function(e){var a=e.id,r=e.name,c=window.confirm("Delete ".concat(r,"?"));c&&h(a).then((function(e){t(n.filter((function(e){return e.id!==a})))})),console.log(c,a)}(e)}},"delete"))}))))},g=function(e){var n=e.addName,t=e.handleNameChange,a=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{onChange:a})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},E=function(e){var n=e.handleFilterChange;return r.a.createElement("div",null,"filter by name:",r.a.createElement("input",{onChange:n}))},p=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)},v=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),l=Object(u.a)(o,2),i=l[0],m=l[1],h=Object(a.useState)(""),v=Object(u.a)(h,2),j=v[0],O=v[1],C=Object(a.useState)(""),w=Object(u.a)(C,2),N=w[0],k=w[1],y=Object(a.useState)(null),S=Object(u.a)(y,2),A=S[0],P=S[1];Object(a.useEffect)((function(){d().then((function(e){console.log("rendered correctly"),c(e)}))}),[]);var x=t.filter((function(e){return e.name.search(new RegExp(N,"i"))>=0}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{message:A}),r.a.createElement(E,{handleFilterChange:function(e){console.log(e.target.value),k(e.target.value)}}),r.a.createElement("h2",null,"Add a new name/number"),r.a.createElement(g,{handleNameChange:function(e){console.log(e.target.value),m(e.target.value)},handleNumberChange:function(e){console.log(e.target.value),O(e.target.value)},addName:function(e){e.preventDefault(),console.log("button clicked",e.target);var n={name:i,number:j},a=t.find((function(e){return e.name===i}));t.find((function(e){return e.number===j}));(console.log(a),a)?window.confirm("".concat(a.name," is already added, replace the old number?"))&&(a.number=j,f(a).then((function(e){console.log(e),c(t.map((function(n){return n.id!==e.id?n:e})))})).catch((function(e){P("'".concat(a.Name,"' was already deleted from the server"))})),P("Added '".concat(n.name,"'")),setTimeout((function(){P(null)}),5e3)):(s(n).then((function(e){c(t.concat(e))})),P("Added '".concat(n.name,"'")),setTimeout((function(){P(null)}),5e3));m(""),O("")}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(b,{persons:x,setPersons:c}))};t(36);o.a.render(r.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.f8d72577.chunk.js.map