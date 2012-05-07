if Rails.env == 'development'
  # this serves as fixture data for the jasmine suite as well as basic population of data for dev

  practice = Practice.create( :name => 'Demo Practice' )


  # stand alone accounting transactions
  accounting_transaction = AccountingTransaction.new( :date_time => '2012-01-01 13:01',
                                                      :amount => 1111,
                                                      :category_key => '1',
                                                      :account_key => '1',
                                                      :note => 'stand alone accounting transaction one note' )
  accounting_transaction.credit_debit_key = '1'
  accounting_transaction.practice_id = practice.id
  accounting_transaction.save

  accounting_transaction = AccountingTransaction.new( :date_time => '2012-01-02 13:02',
                                                      :amount => 2222,
                                                      :category_key => '2',
                                                      :account_key => '2',
                                                      :note => 'stand alone accounting transaction two note' )
  accounting_transaction.credit_debit_key = '2'
  accounting_transaction.practice_id = practice.id
  accounting_transaction.save

  accounting_transaction = AccountingTransaction.new( :date_time => '2012-01-03 13:03',
                                                      :amount => 3333,
                                                      :category_key => '3',
                                                      :account_key => '3',
                                                      :note => 'stand alone accounting transaction three note' )
  accounting_transaction.credit_debit_key = '1'
  accounting_transaction.practice_id = practice.id
  accounting_transaction.save



  # invoices

  # invoice with no associated receivables and accounting transactions
  invoice = Invoice.new( :date_time => '2012-01-01 13:00',
                         :note      => 'invoice one note' )
  invoice.practice_id = practice.id
  invoice.save


  # invoices with receivables and accounting transactions
  invoice = Invoice.new( :date_time => '2012-01-01 13:00',
                         :note      => 'invoice two note' )
  invoice.practice_id = practice.id
  invoice.save

  receivable = Receivable.new( :invoice_id                 => invoice.id,
                               :amount                     => 1111,
                               :balance_due                => 0,
                               :category_key               => '1',
                               :billing_identity_id        => 1,
                               :attributed_sale_idenity_id => 1 )
  receivable.practice_id = practice.id
  receivable.save



  accounting_transaction = AccountingTransaction.new( :date_time => '2012-01-01 13:01',
                                                      :amount => 1111,
                                                      :category_key => '1',
                                                      :account_key => '1',
                                                      :note => 'one note' )
  accounting_transaction.credit_debit_key = '1'
  accounting_transaction.practice_id = practice.id
  accounting_transaction.save

  accounting_transaction = AccountingTransaction.new( :date_time => '2012-01-02 13:02',
                                                      :amount => 2222,
                                                      :category_key => '2',
                                                      :account_key => '2',
                                                      :note => 'two note' )
  accounting_transaction.credit_debit_key = '2'
  accounting_transaction.practice_id = practice.id
  accounting_transaction.save

  accounting_transaction = AccountingTransaction.new( :date_time => '2012-01-03 13:03',
                                                      :amount => 3333,
                                                      :category_key => '3',
                                                      :account_key => '3',
                                                      :note => 'three note' )
  accounting_transaction.credit_debit_key = '2'
  accounting_transaction.practice_id = practice.id
  accounting_transaction.save


  # invoice with accounting transactions
  invoice = Invoice.new( :date_time => '2012-01-01 13:00',
                         :note => 'blah' )
  invoice.practice_id = practice.id
  invoice.save
  %w(1 2 3).each do |i|
    accounting_transaction = AccountingTransaction.new( :date_time => "2012-01-0#{i} 13:0#{i}",
                                                        :invoice_id => invoice.id,
                                                        :credit_debit_key => i,
                                                        :amount => i * 4,
                                                        :category_key => i,
                                                        :account_key => i,
                                                        :note => "#{i} note" )
    accounting_transaction.practice_id = practice.id
    accounting_transaction.save
  end
end

option_selector = OptionSelector.create(:name => 'accounting_credit_debit')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '1', :value => 'Income')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '2', :value => 'Expense')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => 'cancel', :value => 'Cancel')

option_selector = OptionSelector.create(:name => 'accounting_category')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '1', :value => 'Cafe')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '2', :value => 'Dining')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '3', :value => 'Groceries')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '4', :value => 'Rent')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '5', :value => 'Utilities')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => 'blank', :value => '')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => 'cancel', :value => 'Cancel')

option_selector = OptionSelector.create(:name => 'accounting_account')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '1', :value => 'B of A CC')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '2', :value => 'Cash')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '3', :value => 'CHAP')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '4', :value => 'Zions')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => 'blank', :value => '')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => 'cancel', :value => 'Cancel')
