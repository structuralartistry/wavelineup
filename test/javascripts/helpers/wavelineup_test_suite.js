(function() {
  'use strict';

  window.WavelineupTestSuite = {

    // holds data for the test run if needed, at this point for the set_wavelineup_base_data method
    data: {base: {}},

    simulate_paginated_server_response: function(records_array) {
      var output = {"records": records_array,"total_record_count":1,"page_size":15,"page_number":1};
      _.each(records_array, function(record){
        output.records.push(record) }
      );
      return output;
    },

    set_wavelineup_base_data: function(accounting_transactions_array){
      Wavelineup.set_base_data = function() {
        Wavelineup.instance.collections.option_selectors = new Wavelineup.Collections.OptionSelectors();

        Wavelineup.instance.collections.option_selectors.reset(all_option_selectors);

        Wavelineup.instance.collections.option_selector_options = new Wavelineup.Collections.OptionSelectorOptions();
        Wavelineup.instance.collections.option_selector_options.reset(all_option_selector_options);

        Wavelineup.instance.collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();

        var accounting_transactions = simulate_paginated_server_response(accounting_transactions_array);

        Wavelineup.instance.collections.accounting_transactions.reset(accounting_transactions);
      }
    },

//    var accounting_transactions_base_json

    initialize_app: function(options) {
      this.server = sinon.fakeServer.create();

      setFixtures("<div id='container'>Loading...</div>");
      expect($('#container')).toHaveText('Loading...');

      Wavelineup.set_base_data = function() {
        Wavelineup.instance.collections.option_selectors = new Wavelineup.Collections.OptionSelectors();
        Wavelineup.instance.collections.option_selectors.reset(all_option_selectors);

        Wavelineup.instance.collections.option_selector_options = new Wavelineup.Collections.OptionSelectorOptions();
        Wavelineup.instance.collections.option_selector_options.reset(all_option_selector_options);

        Wavelineup.instance.collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
        var accounting_transactions = WavelineupTestSuite.simulate_paginated_server_response(WavelineupTestSuite.data.base.accounting_transactions);
        Wavelineup.instance.collections.accounting_transactions.reset(accounting_transactions);
      }

      // turn off the router
      if( (typeof Backbone.history == 'object') && (typeof Backbone.history.stop == 'function') ) Backbone.history.stop();

      Wavelineup.init();

      if(options.url) {
        Wavelineup.instance.routers.main.navigate(options.url, true);
        var current_url = Backbone.history.getHash();
        expect(current_url).toEqual(options.url)
      }
    },

    clean_up: function() {
      if(Wavelineup) Wavelineup.instance = undefined;
      this.data = {base: {}}
      if(this.server) this.server.restore();
      setFixtures('');
      if(typeof jQuery.ajax.restore == 'function') jQuery.ajax.restore();
    }

  }
}());
