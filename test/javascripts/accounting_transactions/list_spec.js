describe('accounting transactions list', function() {

  beforeEach(function() {
    var accounting_transactions = [];
    accounting_transactions.push(BackboneFactory.create('accounting_transaction', function(){return {invoice_id: 1}}));
    _.each([1,2,3,4], function(){
      accounting_transactions.push(BackboneFactory.create('accounting_transaction'));
    });
    WavelineupTestSuite.data.base.accounting_transactions = accounting_transactions;

    WavelineupTestSuite.initialize_app({url: 'accounting_transactions'});
  }),

  afterEach(function() {
    WavelineupTestSuite.clean_up();
  }),

  // index/list
  it('loads the index page with correct content showing all items in returned collection', function() {
    expect($('.new_accounting_transaction.expense')).toExist();
    expect($('.new_accounting_transaction.income')).toExist();

    expect($('#accounting_transactions')).toBeVisible();
    expect(Wavelineup.instance.collections.accounting_transactions.length).toEqual(5);

    _.each(Wavelineup.instance.collections.accounting_transactions.models, function(accounting_transaction) {
      $accounting_transaction = $('.accounting_transaction.' + accounting_transaction.get('id'));
      expect($accounting_transaction).toBeVisible();
      expect(($accounting_transaction).find('td:contains(' + accounting_transaction.get('accounting_category_value') + ')')).toBeVisible()
    });
  }),

  it('shows Edit button and route if no invoice associated, Invoice button and route if invoice associated', function () {
    var accounting_transaction_with_invoice, accounting_transaction_no_invoice;

    Wavelineup.instance.collections.accounting_transactions.each(function (accounting_transaction) {
      if(accounting_transaction.get('invoice_id') != null) {
        accounting_transaction_with_invoice = accounting_transaction;
      } else {
        accounting_transaction_no_invoice = accounting_transaction;
      }
    });

    expect($('.accounting_transaction.' + accounting_transaction_with_invoice.get('id') + ' .view_invoice')).toBeVisible();
    expect($('.accounting_transaction.' + accounting_transaction_with_invoice.get('id') + ' .edit')).not.toExist();


    expect($('.accounting_transaction.' + accounting_transaction_no_invoice.get('id') + ' .view_invoice')).not.toExist();
    expect($('.accounting_transaction.' + accounting_transaction_no_invoice.get('id') + ' .edit')).toBeVisible();
  }),

  it('navigates to the associated invoice when Invoice button is clicked', function () {
    var accounting_transaction_with_invoice;
    Wavelineup.instance.collections.accounting_transactions.each(function (accounting_transaction) {
      if(accounting_transaction.get('invoice_id') != null) accounting_transaction_with_invoice = accounting_transaction;
    });

    $('.accounting_transaction.' + accounting_transaction_with_invoice.get('id') + ' .view_invoice').mousedown();

    current_url = Backbone.history.getHash();
    expect(current_url).toEqual('invoices/' + accounting_transaction_with_invoice.get('invoice_id'));

    expect($('#content:contains(Viewing Invoice id ' + accounting_transaction_with_invoice.get('invoice_id') + ')')).toBeVisible();
  })
});
