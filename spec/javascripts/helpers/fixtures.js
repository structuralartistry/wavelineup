window.fixtures = {
  accounting_transactions: {
    attributes: ['date_time','credit_debit_id','amount','category_id','account_id','note'],
    errors: '{"errors":{"date_time":["can\'t be blank"],"credit_debit_id":["can\'t be blank"],"amount":["can\'t be blank"],"category_id":["can\'t be blank"],"account_id":["can\'t be blank"]}}',
    one: { "account_id":1,
            "amount":"1.11",
            "category_id":11,
            "created_at":"2001-01-01T01:01:01Z",
            "id":111,
            "note":"accounting transaction one",
            "date_time":"2011-11-11T11:11:11Z",
            "credit_debit_id":1111,
            "updated_at":"2001-01-01T01:01:01Z" },
    two: { "account_id":2,
           "amount":"2.22",
           "category_id":22,
           "created_at":"2002-02-02T02:02:02Z",
           "id":222,
           "note":"accounting transaction two",
           "date_time":"2012-02-22T22:22:22Z",
           "credit_debit_id":2222,
           "updated_at":"2002-02-02T02:02:02Z" }
  },
  option_selectors: [
    {"id":1, "name":"credit_debit"}
  ],
  option_selector_options: [
    {"id":1,"key":"1","option_selector_id":1,"value":"Income"},
    {"id":2,"key":"2","option_selector_id":1,"value":"Expense"},
    {"id":3,"key":"blank","option_selector_id":1,"value":""},
    {"id":4,"key":"cancel","option_selector_id":1,"value":"Cancel"}
  ]
}
