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
{"created_at":"2012-05-04T18:42:52Z","id":1,"name":"accounting_credit_debit","updated_at":"2012-05-04T18:42:52Z"},{"created_at":"2012-05-04T18:42:52Z","id":2,"name":"accounting_category","updated_at":"2012-05-04T18:42:52Z"},{"created_at":"2012-05-04T18:42:52Z","id":3,"name":"accounting_account","updated_at":"2012-05-04T18:42:52Z"}
  ],
  option_selector_options: [
{"created_at":"2012-05-04T18:42:52Z","id":1,"key":"1","option_selector_id":1,"updated_at":"2012-05-04T18:42:52Z","value":"Income"},{"created_at":"2012-05-04T18:42:52Z","id":2,"key":"2","option_selector_id":1,"updated_at":"2012-05-04T18:42:52Z","value":"Expense"},{"created_at":"2012-05-04T18:42:52Z","id":3,"key":"blank","option_selector_id":1,"updated_at":"2012-05-04T18:42:52Z","value":""},{"created_at":"2012-05-04T18:42:52Z","id":4,"key":"cancel","option_selector_id":1,"updated_at":"2012-05-04T18:42:52Z","value":"Cancel"},{"created_at":"2012-05-04T18:42:52Z","id":5,"key":"1","option_selector_id":2,"updated_at":"2012-05-04T18:42:52Z","value":"Cafe"},{"created_at":"2012-05-04T18:42:52Z","id":6,"key":"2","option_selector_id":2,"updated_at":"2012-05-04T18:42:52Z","value":"Dining"},{"created_at":"2012-05-04T18:42:52Z","id":7,"key":"3","option_selector_id":2,"updated_at":"2012-05-04T18:42:52Z","value":"Groceries"},{"created_at":"2012-05-04T18:42:52Z","id":8,"key":"4","option_selector_id":2,"updated_at":"2012-05-04T18:42:52Z","value":"Rent"},{"created_at":"2012-05-04T18:42:52Z","id":9,"key":"5","option_selector_id":2,"updated_at":"2012-05-04T18:42:52Z","value":"Utilities"},{"created_at":"2012-05-04T18:42:52Z","id":10,"key":"blank","option_selector_id":2,"updated_at":"2012-05-04T18:42:52Z","value":""},{"created_at":"2012-05-04T18:42:52Z","id":11,"key":"cancel","option_selector_id":2,"updated_at":"2012-05-04T18:42:52Z","value":"Cancel"},{"created_at":"2012-05-04T18:42:52Z","id":12,"key":"1","option_selector_id":3,"updated_at":"2012-05-04T18:42:52Z","value":"B of A CC"},{"created_at":"2012-05-04T18:42:52Z","id":13,"key":"2","option_selector_id":3,"updated_at":"2012-05-04T18:42:52Z","value":"Cash"},{"created_at":"2012-05-04T18:42:52Z","id":14,"key":"3","option_selector_id":3,"updated_at":"2012-05-04T18:42:52Z","value":"CHAP"},{"created_at":"2012-05-04T18:42:53Z","id":15,"key":"4","option_selector_id":3,"updated_at":"2012-05-04T18:42:53Z","value":"Zions"},{"created_at":"2012-05-04T18:42:53Z","id":16,"key":"blank","option_selector_id":3,"updated_at":"2012-05-04T18:42:53Z","value":""},{"created_at":"2012-05-04T18:42:53Z","id":17,"key":"cancel","option_selector_id":3,"updated_at":"2012-05-04T18:42:53Z","value":"Cancel"}
  ]
}
