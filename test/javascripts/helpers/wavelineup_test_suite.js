(function() {
  'use strict';

  window.WavelineupTestSuite = {

    // holds data for the test run if needed, at this point for the Wavelineup.set_base_data method
    data: {base: {}},

    simulate_paginated_server_response: function(records_array) {
      var output = {"records": records_array,"total_record_count":1,"page_size":15,"page_number":1};
      _.each(records_array, function(record){
        output.records.push(record) }
      );
      return output;
    },

    initialize_app: function(options) {
      this.server = sinon.fakeServer.create();

      setFixtures("<div id='container'>Loading...</div>");
      expect($('#container')).toHaveText('Loading...');

      Wavelineup.set_base_data = function() {
        WavelineupTestSuite.factory_data.create_option_selectors_and_options();

        Wavelineup.instance.collections.option_selectors = new Wavelineup.Collections.OptionSelectors();
        Wavelineup.instance.collections.option_selectors.reset(WavelineupTestSuite.factory_data.option_selectors);

        Wavelineup.instance.collections.option_selector_options = new Wavelineup.Collections.OptionSelectorOptions();
        Wavelineup.instance.collections.option_selector_options.reset(WavelineupTestSuite.factory_data.option_selector_options);

        Wavelineup.instance.collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
        var accounting_transactions = WavelineupTestSuite.simulate_paginated_server_response(WavelineupTestSuite.data.base.accounting_transactions);
        Wavelineup.instance.collections.accounting_transactions.reset(accounting_transactions);
      }

      // turn off the router
      if( (typeof Backbone.history == 'object') && (typeof Backbone.history.stop == 'function') ) Backbone.history.stop();

      Wavelineup.init();

console.log(options);
      if(options.url) {
        Wavelineup.instance.routers.main.navigate(options.url, true);
        var current_url = Backbone.history.getHash();
console.log(current_url)
console.log(options.url)
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

  },

  WavelineupTestSuite.factory_data = {

    create_option_selectors_and_options: function() {
      //option selectors
      this.option_selectors = [];
      this.option_selectors.push(BackboneFactory.create('option_selector', function() { return { name: 'accounting_category_income' } } ));
      this.option_selectors.push(BackboneFactory.create('option_selector', function() { return { name: 'accounting_category_expense' } } ));
      this.option_selectors.push(BackboneFactory.create('option_selector', function() { return { name: 'accounting_account' } } ));
      this.option_selectors.push(BackboneFactory.create('option_selector', function() { return { name: 'identity_type' } } ));
      this.option_selectors.push(BackboneFactory.create('option_selector', function() { return { name: 'product_service' } } ));

      this.option_selector_options = [];
      _.each(this.option_selectors, function(option_selector) {
        this.option_selector_options = this.option_selector_options.concat(this.create_options_for_option_selector(option_selector));
      }, this);
    },

    create_options_for_option_selector: function (option_selector) {
      var option_selector_options = [];
      _.each([1,2,3], function () {
        var factory = BackboneFactory.create('option_selector_option', function () {
          return {
            option_selector_id: option_selector.get('id')
          }
        });
        option_selector_options.push(factory);
      });

          // blank
        //  var factory = BackboneFactory.create('option_selector_option', function () {
        //    return {
        //      option_selector_id: option_selector.get('id'),
        //      value: ' '
        //    }
        //  });
        //  all_option_selector_options.push(factory);
        //
        //  // cancel
        //  var factory = BackboneFactory.create('option_selector_option', function () {
        //    return {
        //      option_selector_id: option_selector.get('id'),
        //      value: 'Cancel'
        //    }
        //  });
        //  all_option_selector_options.push(factory);
      return option_selector_options;
    }
  }
}());
