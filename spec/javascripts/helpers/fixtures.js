window.fixtures = {
  accounting_transactions: {
    attributes: ['date_time','credit_debit_key','amount','category_key','account_key','note'],
    errors: '{"errors":{"date_time":["can\'t be blank"],"credit_debit_key":["can\'t be blank"],"amount":["can\'t be blank"],"category_key":["can\'t be blank"],"account_key":["can\'t be blank"]}}',
    one: { "account_key":'1',
            "amount":"1.11",
            "category_key":'1',
            "created_at":"2001-01-01T01:01:01Z",
            "id":111,
            "note":"accounting transaction one",
            "date_time":"2011-11-11T11:11:11Z",
            "credit_debit_key":'1',
            "updated_at":"2001-01-01T01:01:01Z" },
    two: { "account_key":2,
           "amount":"2.22",
           "category_key":22,
           "created_at":"2002-02-02T02:02:02Z",
           "id":222,
           "note":"accounting transaction two",
           "date_time":"2012-02-22T22:22:22Z",
           "credit_debit_key":2222,
           "updated_at":"2002-02-02T02:02:02Z" }
  },
  option_selectors: [
{"id":1,"name":"accounting_credit_debit"},{"id":2,"name":"accounting_category_expense"},{"id":3,"name":"accounting_category_income"},{"id":4,"name":"accounting_account"},{"id":5,"name":"identity_types"},{"id":6,"name":"product_service"}
  ],
  option_selector_options: [
{"option_selector_id":1,"key":"1","value":"Credit","default_price":null},{"option_selector_id":1,"key":"2","value":"Debit","default_price":null},{"option_selector_id":2,"key":"1","value":"Advertising","default_price":null},{"option_selector_id":2,"key":"2","value":"Equipment","default_price":null},{"option_selector_id":2,"key":"3","value":"Office Supplies","default_price":null},{"option_selector_id":2,"key":"4","value":"Rent","default_price":null},{"option_selector_id":2,"key":"5","value":"Utilities","default_price":null},{"option_selector_id":2,"key":"blank","value":"","default_price":null},{"option_selector_id":2,"key":"cancel","value":"Cancel","default_price":null},{"option_selector_id":3,"key":"1","value":"Cash Payment","default_price":null},{"option_selector_id":3,"key":"2","value":"Credit Card Payment","default_price":null},{"option_selector_id":3,"key":"3","value":"Check Payment","default_price":null},{"option_selector_id":3,"key":"4","value":"Insurance Payment","default_price":null},{"option_selector_id":3,"key":"blank","value":"","default_price":null},{"option_selector_id":3,"key":"cancel","value":"Cancel","default_price":null},{"option_selector_id":4,"key":"1","value":"Cash Reserves","default_price":null},{"option_selector_id":4,"key":"2","value":"Business Checking","default_price":null},{"option_selector_id":4,"key":"3","value":"Business Savings","default_price":null},{"option_selector_id":4,"key":"blank","value":"","default_price":null},{"option_selector_id":4,"key":"cancel","value":"Cancel","default_price":null},{"option_selector_id":5,"key":"1","value":"Prospective Client","default_price":null},{"option_selector_id":5,"key":"2","value":"Practice Member","default_price":null},{"option_selector_id":5,"key":"3","value":"Insurance Company","default_price":null},{"option_selector_id":5,"key":"4","value":"Practitioner","default_price":null},{"option_selector_id":5,"key":"5","value":"Practice Personnel","default_price":null},{"option_selector_id":6,"key":"1","value":"Introductory Package","default_price":15000},{"option_selector_id":6,"key":"2","value":"Entrainment","default_price":5000},{"option_selector_id":6,"key":"3","value":"SRI Session","default_price":4000},{"option_selector_id":6,"key":"4","value":"10 Visit Package","default_price":45000},{"option_selector_id":6,"key":"5","value":"Herbs/Vitamins","default_price":2995},{"option_selector_id":6,"key":"6","value":"Homeopathic Remedies","default_price":599},{"option_selector_id":6,"key":"blank","value":"","default_price":null},{"option_selector_id":6,"key":"cancel","value":"Cancel","default_price":null}
  ]
}
