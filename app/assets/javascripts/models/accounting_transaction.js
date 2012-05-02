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
    'credit_debit_key': '',
    'amount': '',
    'category_key': '',
    'account_key': '',
    'note': ''
  },

  credit_debit_value: function () {
    return Waveline.instance.collections.option_selector_options.get_option_by_key('credit_debit', this.get('credit_debit_key'));
  },

  category_value: function () {
    return Waveline.instance.collections.option_selector_options.get_option_by_key('accounting_category', this.get('category_key'));
  },

  account_value: function () {
    return Waveline.instance.collections.option_selector_options.get_option_by_key('accounting_account', this.get('account_key'));
  }

});
