Wavelineup.Collections.AccountingTransactions = Backbone.Collection.extend({
  model: Wavelineup.Models.AccountingTransaction,
  url: '/api/accounting_transactions',

  parse: function (response) {
    this.total_record_count = response.total_record_count;
    this.page_size = response.page_size;
    this.page_number = response.page_number;

    return response.records;
  }

});
