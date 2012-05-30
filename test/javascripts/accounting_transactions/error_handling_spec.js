describe('accounting transactions error handling', function() {

  beforeEach(function() {
    this.accounting_transaction = BackboneFactory.create('accounting_transaction');
    WavelineupTestSuite.data.base.accounting_transactions = [this.accounting_transaction];
    WavelineupTestSuite.initialize_app({url: 'accounting_transactions'});
  }),

  afterEach(function() {
    WavelineupTestSuite.clean_up();
  }),

  // this eventually should go into general error handling testing... perhaps!!!
  it('responds correctly to a 500 server error', function () {
    var $accounting_transaction, updated_note_value = 'this is an updated note';

    $accounting_transaction = $('.accounting_transaction.' + this.accounting_transaction.get('id'));
    expect($accounting_transaction).toBeVisible();

    // edit the transaction
    $($accounting_transaction.find('.edit')).mousedown();

    // submit and verify data sent to server
    WavelineupTestSuite.server.respondWith("PUT", "/api/accounting_transactions/" + this.accounting_transaction.get('id'),
                                    [500, { "Content-Type": "application/json" },
                                     'something bad']);

    $('.save').mousedown();

    WavelineupTestSuite.server.respond();

    expect($('#notices').html()).toEqual('A fatal server error occurred.');
  });
});
