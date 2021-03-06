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
    'income_expense': 'expense',
    'amount': '',
    'accounting_category_id': '',
    'accounting_account_id': '',
    'note': ''
  },

  initialize: function () {
    this.constructor.__super__.initialize.apply(this);
    var that = this;

    // virtual attributes for associations
    this.set('accounting_category_value', function () {
      if(Wavelineup.instance) {
        return Wavelineup.instance.collections.option_selector_options.get_value_by_id(that.get('accounting_category_id'));
      }
    })

    this.set('accounting_account_value', function () {
      if(Wavelineup.instance) {
        return Wavelineup.instance.collections.option_selector_options.get_value_by_id(that.get('accounting_account_id'));
      }
    })

  },

});
