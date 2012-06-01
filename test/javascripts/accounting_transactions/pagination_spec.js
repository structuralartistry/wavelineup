describe('collection paginates correctly', function() {

  it('less than one page of records, page 1', function() {
    var accounting_transactions=[], accounting_transactions_paginated_server_response, i;
    for(i=1; i<=5; i++) {
      accounting_transactions.push(WavelineupTestSuite.factory_data.create_accounting_transaction());
    }
    accounting_transactions_paginated_server_response = WavelineupTestSuite.simulate_paginated_server_response({records_array: accounting_transactions});

    accounting_transactions_collection = new Wavelineup.Collections.AccountingTransactions();
    accounting_transactions_collection.reset(accounting_transactions_paginated_server_response);

    expect(accounting_transactions_collection.total_record_count).toEqual(5);
    expect(accounting_transactions_collection.page_size).toEqual(15);
    expect(accounting_transactions_collection.page_number).toEqual(1);
    expect(accounting_transactions_collection.page_record_start).toEqual(1);
    expect(accounting_transactions_collection.page_record_end).toEqual(5);
  }),

  it('more than one page of records, page 1', function() {
    var accounting_transactions=[], accounting_transactions_paginated_server_response, i;
    for(i=1; i<=16; i++) {
      accounting_transactions.push(WavelineupTestSuite.factory_data.create_accounting_transaction());
    }
    accounting_transactions = WavelineupTestSuite.simulate_paginated_server_response({records_array: accounting_transactions});

    accounting_transactions_collection = new Wavelineup.Collections.AccountingTransactions();
    accounting_transactions_collection.reset(accounting_transactions);

    expect(accounting_transactions_collection.total_record_count).toEqual(16);
    expect(accounting_transactions_collection.page_size).toEqual(15);
    expect(accounting_transactions_collection.page_number).toEqual(1);
    expect(accounting_transactions_collection.page_record_start).toEqual(1);
    expect(accounting_transactions_collection.page_record_end).toEqual(15);
  }),

  it('more than one page of records, page 2', function() {
    var accounting_transactions=[], accounting_transactions_paginated_server_response, i;
    accounting_transactions = [];
    for(i=1; i<=16; i++) {
      accounting_transactions.push(WavelineupTestSuite.factory_data.create_accounting_transaction());
    }
    accounting_transactions = WavelineupTestSuite.simulate_paginated_server_response({records_array: accounting_transactions, page_number: 2});

    accounting_transactions_collection = new Wavelineup.Collections.AccountingTransactions();
    accounting_transactions_collection.reset(accounting_transactions);

    expect(accounting_transactions_collection.total_record_count).toEqual(16);
    expect(accounting_transactions_collection.page_size).toEqual(15);
    expect(accounting_transactions_collection.page_number).toEqual(2);
    expect(accounting_transactions_collection.page_record_start).toEqual(16);
    expect(accounting_transactions_collection.page_record_end).toEqual(16);
  })

}),


describe('accounting transactions', function() {

  afterEach(function() {
    WavelineupTestSuite.clean_up();
  }),

  describe('pagination', function () {
// Wavelineup.instance.collections.accounting_transactions.fetch({data: {page_size: 15, page_number: 12}})


    it('shows the pagination information and controls', function () {
      var accounting_transactions = [], i;
      accounting_transactions.push(WavelineupTestSuite.factory_data.create_accounting_transaction({invoice_id: 1}));
      for(i=1; i<=16; i++) {
        accounting_transactions.push(WavelineupTestSuite.factory_data.create_accounting_transaction());
      }
      WavelineupTestSuite.data.base.accounting_transactions = accounting_transactions;

      WavelineupTestSuite.initialize_app({url: 'accounting_transactions'});

      expect($('.accounting_transactions.paginate_previous')).toBeVisible();
      expect($('.accounting_transactions.paginate_next')).toBeVisible();
      expect($('p:contains(1 to 15 of 16 entries)')).toBeVisible();
    })
/*
    it('shows only record number information if less than a full page of records', function() {
expect('todo').toBeFalsy();
      WavelineupTestSuite.initialize_app({url: 'accounting_transactions'});
      expect($('.accounting_transactions.paginate_previous')).not.toExist();
      expect($('.accounting_transactions.paginate_next')).not.toExist();
      expect($('p:contains(1 to 15 of 78 entries)')).toBeVisible();
    }),

    it('shows pagination Next button if more records than what showing and are not on last page', function () {
// load collection with x records and certain pagination
//    how to set differential number of records on load?
    // set data that loads on app load via the main rails index
expect('todo').toBeFalsy();
    }),

    it('shows pagination Prev if not on first page', function () {
expect('todo').toBeFalsy();
    })
*/
  });
});
