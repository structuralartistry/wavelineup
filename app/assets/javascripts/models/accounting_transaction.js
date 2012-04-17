//String.prototype.lpad = function(padString, length) {
//	var str = this;
//    while (str.length < length)
//        str = padString + str;
//    return str;
//}
//current_time.getFullYear() + '-' + current_time.getMonth().toString().lpad('0',2) + '-' + current_time.getDay().toString().lpad('0',2) + ' ' + current_time.getHours().toString().lpad('0',2) + ':' + current_time.getMinutes().toString().lpad('0',2)

Wavelineup.Models.AccountingTransaction = Backbone.Model.extend({
  defaults: {
    'date_time': '2012-01-01 14:01',
    'credit_debit_id': '',
    'amount': '',
    'category_id': '',
    'account_id': '',
    'note': ''
  }
});
