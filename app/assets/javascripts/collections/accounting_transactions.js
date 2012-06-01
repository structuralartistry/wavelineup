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

    // these in future might be calculated but keeping simple

    // default end is the page number * page size
    this.page_record_end = this.page_number*this.page_size;

    this.page_record_start = this.page_record_end-this.page_size+1;

    // default last record is the last record on the page

//last_record_on_page=(this.page_number*this.page_size


    // if the last expected record on page is greater than the actual last record then make it the last record
    if((this.page_record_start+this.page_size)>(this.page_size*this.page_number)) {
    } else {
 //     this.page_record_end = this.page_size*this.page_number;
    }

    // last record
    if(this.page_record_end>=this.total_record_count) {
      this.page_record_end=this.total_record_count;
    }
  }

});
