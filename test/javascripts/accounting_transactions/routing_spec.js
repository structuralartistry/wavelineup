describe('accounting transactions', function() {

  beforeEach(function() {
    this.existing_accounting_transaction = WavelineupTestSuite.factory_data.create_accounting_transaction();

    WavelineupTestSuite.data.base.accounting_transactions = [this.existing_accounting_transaction];

    WavelineupTestSuite.initialize_app({url: 'accounting_transactions'});
  }),

  afterEach(function() {
    WavelineupTestSuite.clean_up();
  }),

  describe('direct routing', function() {

    it('successfully routes to the new form for Income transaction', function() {
      Wavelineup.instance.routers.main.navigate('accounting_transactions/new/income', true);

      expect($('ul#accounting_transaction_new_edit')).toBeVisible();

      // this is on the layer under the modal layer
      expect($('.accounting_transaction.' + this.existing_accounting_transaction.id)).toExist();

      // modal layer
      expect($('#income_expense:contains(income)')).toBeVisible()
    }),

    it('successfully routes to the new form for Expense transaction', function() {
      Wavelineup.instance.routers.main.navigate('accounting_transactions/new/expense', true);

      expect($('ul#accounting_transaction_new_edit')).toBeVisible();

      // this is on the layer under the modal layer
      expect($('.accounting_transaction.' + this.existing_accounting_transaction.id)).toExist();

      // modal layer
      expect($('#income_expense:contains(expense)')).toBeVisible()
    }),

    it('successfully routes to the edit form', function() {
      Wavelineup.instance.routers.main.navigate('accounting_transactions/' + this.existing_accounting_transaction.id, true);

      expect($('ul#accounting_transaction_new_edit')).toBeVisible();
    }),

    it('successfully handles non-existant edit or slow loading collection temporary loading message', function() {
      // come in on new instance of app
      Backbone.history.stop();
      Wavelineup.init();
      Wavelineup.instance.collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
      Wavelineup.instance.routers.main.navigate('accounting_transactions/' + this.existing_accounting_transaction.id, true);
      // note: no loading of collection via server.respond()
      expect($('#modal_content :contains(requested record does not exist or could not be loaded, or the current internet connection is slow)')).toExist();
    })

  });
});
