# todo improvements
# - some sort of factory system for models/json to avoid entering hard data in respond with and forms, etc
# - abstration to fill in forms? (maybe later once implement selectors)
# - abstract groups of checks so that tests are more readable and understanding what getting at to an outsider
#     for example: expect(h.accounting_transactions.index_page_loaded()).toBeTruthy()
#                  see if can hold in same test suite perhaps???
describe 'accounting transactions', ->

  beforeEach ->
    setFixtures("<div id='container'>Loading...</div>")
    expect($('#container')).toHaveText('Loading...')
    expect($('form')).not.toExist()
    @server = sinon.fakeServer.create()

    @server.respondWith("GET", "/api/accounting_transactions",
                                    [200, { "Content-Type": "application/json" },
                                     '[{ "account_id":1,"amount":"11.11","category_id":1,"created_at":"2012-04-04T21:14:57Z","id":1,"note":"blah","t_datetime":"2012-01-01T13:00:00Z","t_type_id":1,"updated_at":"2012-04-04T21:14:57Z" }]'])
    Wavelineup.init()

    @server.respond()

  afterEach ->
    @server.restore()

  it 'loads the index page with correct content', ->
    expect($('#container h1')).toHaveText('Hello World Index View from Backbone!!!')
    expect($('li:contains(2012-01-01T13:00:00Z, 1, 11.11, 1, 1, blah)')).toBeTruthy()
    expect($('form')).toExist()

  it 'sends new Accounting Transaction entry to server', ->
    expect($('li:contains(ben wa balls)')).not.toExist()

    $('#accounting_transaction_t_datetime').val('2012-04-05 13:14')
    $('#accounting_transaction_t_type_id').val('2')
    $('#accounting_transaction_amount').val('99.99')
    $('#accounting_transaction_category_id').val('3')
    $('#accounting_transaction_account_id').val('4')
    $('#accounting_transaction_note').val('ben wa balls')

    @server.respondWith("POST", "/api/accounting_transactions",
                                    [201, { "Content-Type": "application/json" },
                                     '[{"t_datetime":"2012-04-05 13:14","t_type_id":"2","amount":"99.99","category_id":"3","account_id":"4","note":"ben wa balls"}]'])
    sinon.spy(jQuery, 'ajax')
    $('#accounting_transaction_save').click()

    # sends request to server
    expect(jQuery.ajax.getCall(0).args[0].data).toEqual('{"t_datetime":"2012-04-05 13:14","t_type_id":"2","amount":"99.99","category_id":"3","account_id":"4","note":"ben wa balls"}')

    # updates list
    @server.respond()
    expect($('li:contains(ben wa balls)').length).toEqual(1)

    # clears the entry form upon success
    expect($('#accounting_transaction_t_datetime').val()).toEqual('')
    expect($('#accounting_transaction_t_type_id').val()).toEqual('')
    expect($('#accounting_transaction_amount').val()).toEqual('')
    expect($('#accounting_transaction_category_id').val()).toEqual('')
    expect($('#accounting_transaction_account_id').val()).toEqual('')
    expect($('#accounting_transaction_note').val()).toEqual('')

    jQuery.ajax.restore()

  it 'can edit an existing accounting transaction', ->
    expect($(".accounting_transaction_item[data-id='1']")).toBeVisible()
    expect($('#new_accounting_transaction')).toBeVisible()

    $('.edit').click()

    # hides new transaction
    expect($('#new_accounting_transaction')).not.toBeVisible()

    # navigates to edit url
    expect(window.location.href.indexOf('accounting_transactions/edit/1')).toBeGreaterThan(0)

    # shows edit form in place of the
    expect($(".accounting_transaction_item[data-id='1']")).not.toBeVisible()
    expect($('#edit_accounting_transaction')).toBeVisible()

    expect($('#edit_accounting_transaction #accounting_transaction_t_datetime').val()).toEqual('2012-01-01T13:00:00Z')
    expect($('#edit_accounting_transaction #accounting_transaction_t_type_id').val()).toEqual('1')
    expect($('#edit_accounting_transaction #accounting_transaction_amount').val()).toEqual('11.11')
    expect($('#edit_accounting_transaction #accounting_transaction_category_id').val()).toEqual('1')
    expect($('#edit_accounting_transaction #accounting_transaction_account_id').val()).toEqual('1')
    expect($('#edit_accounting_transaction #accounting_transaction_note').val()).toEqual('blah')

    # update a field
    $('#edit_accounting_transaction #accounting_transaction_note').val('this is an updated note')

    # submit and verify data sent to server
#    $('#edit_accounting_transaction #accounting_transaction_save').click()


    # section turns back to a line item with updated data correctly there




