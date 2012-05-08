//String.prototype.lpad = function(padString, length) {
//	var str = this;
//    while (str.length < length)
//        str = padString + str;
//    return str;
//}
//current_time.getFullYear() + '-' + current_time.getMonth().toString().lpad('0',2) + '-' + current_time.getDay().toString().lpad('0',2) + ' ' + current_time.getHours().toString().lpad('0',2) + ':' + current_time.getMinutes().toString().lpad('0',2)

Wavelineup.Models.AccountingTransaction = Wavelineup.Models.Base.extend({
  defaults: {
    'date_time': '2012-01-01 14:01',
    'credit_debit_key': '',
    'amount': '',
    'category_key': '',
    'account_key': '',
    'note': ''
  },

  initialize: function () {
    this.constructor.__super__.initialize.apply(this);
    var that = this;

    // virtual attributes for associations
    this.set('credit_debit_value', function () {
      return Wavelineup.instance.collections.option_selector_options.get_value_by_key('accounting_credit_debit',
                                                                                      that.get('credit_debit_key'));
    })

    this.set('category_value', function () {
      var category_selector_name = 'accounting_category_expense';
      if(that.get('credit_debit_value') == 'Credit') category_selector_name = 'accounting_category_income';
      return Wavelineup.instance.collections.option_selector_options.get_value_by_key(category_selector_name,
                                                                                      that.get('category_key'));
    })

    this.set('account_value', function () {
      return Wavelineup.instance.collections.option_selector_options.get_value_by_key('accounting_account',
                                                                                      that.get('account_key'));
    })

  }

});
