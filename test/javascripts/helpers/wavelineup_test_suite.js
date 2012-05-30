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
        Wavelineup.instance.collections.option_selectors.reset(WavelineupTestSuite.data.base.option_selectors);

        Wavelineup.instance.collections.option_selector_options = new Wavelineup.Collections.OptionSelectorOptions();
        Wavelineup.instance.collections.option_selector_options.reset(WavelineupTestSuite.data.base.option_selector_options);

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

  },

  WavelineupTestSuite.factory_data = {

    create_accounting_transaction: function(attributes) {
      var option_selector_option_accounting_category, option_selector_option_accounting_account, accounting_transaction;

      if(attributes==undefined) attributes = {};

      this.ensure_base_data_structure();

      option_selector_option_accounting_category = BackboneFactory.create('option_selector_option');
      WavelineupTestSuite.data.base.option_selector_options.push(option_selector_option_accounting_category);

      option_selector_option_accounting_account = BackboneFactory.create('option_selector_option');
      WavelineupTestSuite.data.base.option_selector_options.push(option_selector_option_accounting_account);


      if(attributes.accounting_category_id==undefined) {
        attributes['accounting_category_id'] = option_selector_option_accounting_category.get('id');
      }
      if(attributes.accounting_account_id==undefined) {
        attributes['accounting_account_id'] = option_selector_option_accounting_account.get('id');
      }

      accounting_transaction = BackboneFactory.create('accounting_transaction', function() {return attributes});

      return accounting_transaction;
    },

    ensure_base_data_structure: function() {
      var data = WavelineupTestSuite.data.base;
      if(data.options_selectors==undefined) data.option_selectors = [];
      if(data.option_selector_options==undefined) data.option_selector_options = [];
    },

    create_option_selectors_and_options: function() {
      this.ensure_base_data_structure();

      //option selectors
      var data = WavelineupTestSuite.data.base;
      data.option_selectors.push(BackboneFactory.create('option_selector', function() { return { name: 'accounting_category_income' } } ));
      data.option_selectors.push(BackboneFactory.create('option_selector', function() { return { name: 'accounting_category_expense' } } ));
      data.option_selectors.push(BackboneFactory.create('option_selector', function() { return { name: 'accounting_account' } } ));
      data.option_selectors.push(BackboneFactory.create('option_selector', function() { return { name: 'identity_type' } } ));
      data.option_selectors.push(BackboneFactory.create('option_selector', function() { return { name: 'product_service' } } ));

      _.each(data.option_selectors, function(option_selector) {
        data.option_selector_options = data.option_selector_options.concat(this.create_options_for_option_selector(option_selector));
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
