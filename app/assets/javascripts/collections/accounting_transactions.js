Wavelineup.Collections.AccountingTransactions = Backbone.Collection.extend({
  model: Wavelineup.Models.AccountingTransaction,
  url: '/api/accounting_transactions',

  parse: function (response) {
    this.set_pagination_info(response);
    return response.records;
  },

  reset: function(attributes, options) {
    // if this is getting the raw json, which the records are an internal collection
    if(attributes.hasOwnProperty('records')) {
      this.set_pagination_info(attributes);
      attributes = attributes.records;
    }
    Backbone.Collection.prototype.reset.call(this, attributes, options);
  },

  set_pagination_info: function(response) {
    this.total_record_count = response['total_record_count'];
    this.page_size = response['page_size'];
    this.page_number = response['page_number'];
  }

});
