window.fixtures = {
  accounting_transactions: {
    attributes: ['t_datetime','t_type_id','amount','category_id','account_id','note'],
    errors: '{"errors":{"t_datetime":["can\'t be blank"],"t_type_id":["can\'t be blank"],"amount":["can\'t be blank"],"category_id":["can\'t be blank"],"account_id":["can\'t be blank"]}}',
    one: { "account_id":1,
            "amount":"1.11",
            "category_id":11,
            "created_at":"2001-01-01T01:01:01Z",
            "id":111,
            "note":"accounting transaction one",
            "t_datetime":"2011-11-11T11:11:11Z",
            "t_type_id":1111,
            "updated_at":"2001-01-01T01:01:01Z" },
    two: { "account_id":2,
           "amount":"2.22",
           "category_id":22,
           "created_at":"2002-02-02T02:02:02Z",
           "id":222,
           "note":"accounting transaction two",
           "t_datetime":"2012-02-22T22:22:22Z",
           "t_type_id":2222,
           "updated_at":"2002-02-02T02:02:02Z" }
  }
}
