describe 'hello world', ->

  it 'it succeeds', ->
    expect(2).toEqual(2)


describe 'accounting transactions', ->

  it 'loads the index page with correct content', ->
    setFixtures("<div id='container'>Loading...</div>")
    expect($('#container')).toHaveText('Loading...')
    expect($('form')).not.toExist()
    server = sinon.fakeServer.create()

    server.respondWith("GET", "/api/accounting_transactions",
                                    [200, { "Content-Type": "application/json" },
                                     '[{ "account_id":1,"amount":"11.11","category_id":1,"created_at":"2012-04-04T21:14:57Z","id":1,"note":"blah","t_datetime":"2012-01-01T13:00:00Z","t_type_id":1,"updated_at":"2012-04-04T21:14:57Z" }]'])
    Wavelineup.init()

    server.respond()
    expect($('#container h1')).toHaveText('Hello World Index View from Backbone!!!')
    expect($('li:containsRegex(/2012-01-01T13:00:00Z, 1, 11.11, 1, 1, blah/)')).toBeTruthy()
    expect($('form')).toExist()
    server.restore()

  it 'creates a new Accounting Transaction entry', ->
    setFixtures("<div id='container'>Loading...</div>")
    server = sinon.fakeServer.create()
    server.respondWith("GET", "/api/accounting_transactions",
                                    [200, { "Content-Type": "application/json" },
                                     '[{ "account_id":1,"amount":"11.11","category_id":1,"created_at":"2012-04-04T21:14:57Z","id":1,"note":"blah","t_datetime":"2012-01-01T13:00:00Z","t_type_id":1,"updated_at":"2012-04-04T21:14:57Z" }]'])
    Wavelineup.init()

    server.respond()

    $('#new_accounting_transaction_t_datetime').val('2012-04-05 13:14')
    $('#new_accounting_transaction_t_type_id').val('2')
    $('#new_accounting_transaction_amount').val('99.99')
    $('#new_accounting_transaction_category_id').val('3')
    $('#new_accounting_transaction_account_id').val('4')
    $('#new_accounting_transaction_note').val('ben wa balls')


    sinon.spy(jQuery, 'ajax')
    $('#new_accounting_transaction_add').click()

    # sends request to server
    expect(jQuery.ajax.getCall(0).args[0].data).toEqual('{"t_datetime":"2012-04-05 13:14","amount":"99.99","category_id":"3","account_id":"4","note":"ben wa balls"}')

    # updates list
    expect($('li:contains(ben wa balls)').length).toEqual(1)

    jQuery.ajax.restore()
    server.restore()





#just for depth, eventually delete from here on...
  it 'loads the index page with correct content', ->
    setFixtures("<div id='container'>Loading...</div>")
    expect($('#container')).toHaveText('Loading...')
    server = sinon.fakeServer.create()

    server.respondWith("GET", "/api/accounting_transactions",
                                    [200, { "Content-Type": "application/json" },
                                     '[{ "account_id":1,"amount":"11.11","category_id":1,"created_at":"2012-04-04T21:14:57Z","id":1,"note":"blah","t_datetime":"2012-01-01T13:00:00Z","t_type_id":1,"updated_at":"2012-04-04T21:14:57Z" }]'])
    Wavelineup.init()

    server.respond()
    expect($('#container h1')).toHaveText('Hello World Index View from Backbone!!!')
    expect($('li:containsRegex(/2012-01-01T13:00:00Z, 1, 11.11, 1, 1, blah/)')).toBeTruthy()
    server.restore()

  it 'loads the index page with correct content', ->
    setFixtures("<div id='container'>Loading...</div>")
    expect($('#container')).toHaveText('Loading...')
    server = sinon.fakeServer.create()

    server.respondWith("GET", "/api/accounting_transactions",
                                    [200, { "Content-Type": "application/json" },
                                     '[{ "account_id":1,"amount":"11.11","category_id":1,"created_at":"2012-04-04T21:14:57Z","id":1,"note":"blah","t_datetime":"2012-01-01T13:00:00Z","t_type_id":1,"updated_at":"2012-04-04T21:14:57Z" }]'])
    Wavelineup.init()

    server.respond()
    expect($('#container h1')).toHaveText('Hello World Index View from Backbone!!!')
    expect($('li:containsRegex(/2012-01-01T13:00:00Z, 1, 11.11, 1, 1, blah/)')).toBeTruthy()
    server.restore()
