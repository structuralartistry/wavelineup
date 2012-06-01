describe('accounting transactions', function() {

  beforeEach(function() {
  }),

  afterEach(function() {
    WavelineupTestSuite.clean_up();
  }),

  describe('pagination', function () {
// Wavelineup.instance.collections.accounting_transactions.fetch({data: {page_size: 15, page_number: 12}})

    it('shows no Prev and Next buttons if no records', function() {
      WavelineupTestSuite.initialize_app({url: 'accounting_transactions'});
      expect($('.accounting_transactions.paginate_previous')).not.toExist();
      expect($('.accounting_transactions.paginate_next')).not.toExist();
    }),

    it('shows the pagination Prev and Next buttons', function () {
      WavelineupTestSuite.initialize_app({url: 'accounting_transactions'});
      expect($('.accounting_transactions.paginate_previous')).toBeVisible();
      expect($('.accounting_transactions.paginate_next')).toBeVisible();
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

  });
});
