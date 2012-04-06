/* jQuery selector to match exact text inside an element
 *  :containsExact()     - case insensitive
 *  :containsExactCase() - case sensitive
 *  :containsRegex()     - set by user ( use: $(el).find(':containsRegex(/(red|blue|yellow)/gi)') )
 */
$.extend($.expr[':'],{
 containsExact: function(a,i,m){
  return $.trim(a.innerHTML.toLowerCase()) === m[3].toLowerCase();
 },
 containsExactCase: function(a,i,m){
  return $.trim(a.innerHTML) === m[3];
 },
 // Note all escaped characters need to be double escaped
 // inside of the containsRegex, so "\(" needs to be "\\("
 containsRegex: function(a,i,m){
  var regreg =  /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})$/,
   reg = regreg.exec(m[3]);
  return reg ? RegExp(reg[1], reg[2]).test($.trim(a.innerHTML)) : false;
 }

});
