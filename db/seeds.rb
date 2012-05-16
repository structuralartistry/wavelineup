# production seed data goals
# * base standard seed date for a new practice (will be used/copied for Practice#create)

option_selector_accounting_category_expense = OptionSelector.create(:name => 'accounting_category_expense')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_expense.id, :value => 'Advertising')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_expense.id, :value => 'Equipment')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_expense.id, :value => 'Office Supplies')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_expense.id, :value => 'Rent')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_expense.id, :value => 'Utilities')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_expense.id, :value => '')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_expense.id, :value => 'Cancel')

option_selector_accounting_category_income = OptionSelector.create(:name => 'accounting_category_income')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_income.id, :value => 'Cash Payment')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_income.id, :value => 'Credit Card Payment')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_income.id, :value => 'Check Payment')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_income.id, :value => 'Insurance Payment')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_income.id, :value => '')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_category_income.id, :value => 'Cancel')

option_selector_accounting_account = OptionSelector.create(:name => 'accounting_account')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_account.id, :value => 'Cash Reserves')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_account.id, :value => 'Business Checking')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_account.id, :value => 'Business Savings')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_account.id, :value => '')
OptionSelectorOption.create(:option_selector_id => option_selector_accounting_account.id, :value => 'Cancel')

option_selector_identity_types = OptionSelector.create(:name => 'identity_types')
OptionSelectorOption.create(:option_selector_id => option_selector_identity_types.id, :value => 'Prospective Client')
OptionSelectorOption.create(:option_selector_id => option_selector_identity_types.id, :value => 'Practice Member')
OptionSelectorOption.create(:option_selector_id => option_selector_identity_types.id, :value => 'Insurance Company')
OptionSelectorOption.create(:option_selector_id => option_selector_identity_types.id, :value => 'Practitioner')
OptionSelectorOption.create(:option_selector_id => option_selector_identity_types.id, :value => 'Practice Personnel')

option_selector_product_service = OptionSelector.create(:name => 'product_service')
OptionSelectorOption.create(:option_selector_id => option_selector_product_service.id, :value => 'Introductory Package', :default_price => 15000)
OptionSelectorOption.create(:option_selector_id => option_selector_product_service.id, :value => 'Entrainment', :default_price => 5000)
OptionSelectorOption.create(:option_selector_id => option_selector_product_service.id, :value => 'SRI Session', :default_price => 4000)
OptionSelectorOption.create(:option_selector_id => option_selector_product_service.id, :value => '10 Visit Package', :default_price => 45000)
OptionSelectorOption.create(:option_selector_id => option_selector_product_service.id, :value => 'Herbs/Vitamins', :default_price => 2995)
OptionSelectorOption.create(:option_selector_id => option_selector_product_service.id, :value => 'Homeopathic Remedies', :default_price => 599)
OptionSelectorOption.create(:option_selector_id => option_selector_product_service.id, :value => '')
OptionSelectorOption.create(:option_selector_id => option_selector_product_service.id, :value => 'Cancel')


if Rails.env == 'development'
  # development/test seed data goals
  # - fixtures for jasmine suite
  # - illustrate all major features/differential
  # - serve for marketing/screenshots
  # - *only* as much data as needed, the minimal agile set

  practice = Practice.create( :name => 'Exuberant Wellness' )


  identity_insurance_one = Identity.create(
    :type_id => option_selector_identity_types.option_selector_options.find_by_value('Insurance Company').id,
    :company_name => 'ACME Insurance Co' )


  identity_practitioner_one = Identity.create(
    :type_id => option_selector_identity_types.option_selector_options.find_by_value('Practitioner').id,
    :last_name => 'Wilhelm',
    :first_name => 'Reich' )

  identity_practitioner_two = Identity.create(
    :type_id => option_selector_identity_types.option_selector_options.find_by_value('Practitioner').id,
    :last_name => 'DD',
    :first_name => 'Palmer' )


  identity_practice_personnel_one = Identity.create(
    :type_id => option_selector_identity_types.option_selector_options.find_by_value('Practitioner').id,
    :last_name => 'Rosie',
    :first_name => 'Admon' )


  identity_practice_member_one = Identity.create(
    :type_id => option_selector_identity_types.option_selector_options.find_by_value('Practice Member').id,
    :last_name => 'Ian',
    :first_name => 'Stuk' )

  identity_practice_member_two = Identity.create(
    :type_id => option_selector_identity_types.option_selector_options.find_by_value('Practice Member').id,
    :last_name => 'May',
    :middle_name => 'Bee',
    :first_name => 'Enlightened' )

  identity_practice_member_three = Identity.create(
    :type_id => option_selector_identity_types.option_selector_options.find_by_value('Practice Member').id,
    :last_name => 'Moe',
    :first_name => 'Transform' )


  # stand alone accounting transactions
  accounting_transaction = AccountingTransaction.new(
    :date_time => '2012-01-01 10:05',
    :income_expense => 'income',
    :amount => 2198,
    :category_id => option_selector_accounting_category_income.option_selector_options.find_by_value('Credit Card Payment').id,
    :account_id => option_selector_accounting_account.option_selector_options.find_by_value('Business Checking').id,
    :note => 'verify in checking' )
  accounting_transaction.practice_id = practice.id
  accounting_transaction.save!

  accounting_transaction = AccountingTransaction.new(
    :date_time => '2012-01-02 11:32',
    :income_expense => 'expense',
    :amount => 100000,
    :category_id => option_selector_accounting_category_expense.option_selector_options.find_by_value('Rent').id,
    :account_id => option_selector_accounting_account.option_selector_options.find_by_value('Business Checking').id,
    :note => 'Jan 2012' )
  accounting_transaction.practice_id = practice.id
  accounting_transaction.save!

  accounting_transaction = AccountingTransaction.new(
    :date_time => '2012-01-03 13:03',
    :income_expense => 'expense',
    :amount => 3312,
    :category_id => option_selector_accounting_category_expense.option_selector_options.find_by_value('Office Supplies').id,
    :account_id => option_selector_accounting_account.option_selector_options.find_by_value('Cash Reserves').id,
    :note => 'business cards' )
  accounting_transaction.practice_id = practice.id
  accounting_transaction.save!



  # invoices

  # invoice with no associated receivables and accounting transactions
  invoice = Invoice.new(
    :date_time => '2012-01-01 09:45',
    :identity_id => identity_practice_member_one.id,
    :note      => 'placeholder for todays treatments' )
  invoice.practice_id = practice.id
  invoice.save!


  # invoice with receivables only, no payments applied
  invoice = Invoice.new(
    :date_time => '2012-01-02 13:02',
    :identity_id => identity_practice_member_two.id,
    :note      => 'will pay next visit and bring insurance info' )
  invoice.practice_id = practice.id
  invoice.save!

  receivable = Receivable.new(
    :invoice_id                 => invoice.id,
    :amount                     => 7500,
    :balance_due                => 0,
    :category_id               => option_selector_product_service.option_selector_options.find_by_value('Entrainment').id,
    :billing_identity_id        => identity_insurance_one.id,
    :attributed_sale_identity_id => identity_practitioner_two.id )
  receivable.practice_id = practice.id
  receivable.save!

  receivable = Receivable.new(
    :invoice_id                 => invoice.id,
    :amount                     => 4000,
    :balance_due                => 0,
    :category_id               => option_selector_product_service.option_selector_options.find_by_value('SRI Session').id,
    :billing_identity_id        => nil,
    :attributed_sale_identity_id => identity_practitioner_one.id )
  receivable.practice_id = practice.id
  receivable.save!


  # invoices with receivables and payments applied via accounting transactions
  invoice = Invoice.new(
    :date_time => '2012-01-03 16:18',
    :identity_id => identity_practice_member_two.id,
    :note      => 'need to contact insurance re short payment' )
  invoice.practice_id = practice.id
  invoice.save!

  receivable = Receivable.new(
    :invoice_id                 => invoice.id,
    :amount                     => 1100,
    :balance_due                => 0,
    :category_id               => option_selector_product_service.option_selector_options.find_by_value('Herbs/Vitamins').id,
    :billing_identity_id        => nil,
    :attributed_sale_identity_id => identity_practice_personnel_one.id )
  receivable.practice_id = practice.id
  receivable.save!

  # this receivable is paid by the following accounting transaction (note receivable_id in the accounting transaction)
  receivable = Receivable.new(
    :invoice_id                 => invoice.id,
    :amount                     => 7500,
    :balance_due                => 0,
    :category_id               => option_selector_product_service.option_selector_options.find_by_value('Entrainment').id,
    :billing_identity_id        => identity_insurance_one.id,
    :attributed_sale_identity_id => identity_practitioner_one.id )
  receivable.practice_id = practice.id
  receivable.save!

  accounting_transaction = AccountingTransaction.new(
    :invoice_id                 => invoice.id,
    :date_time => '2012-01-03 16:18',
    :income_expense => 'income',
    :amount => 6100,
    :category_id => option_selector_accounting_category_income.option_selector_options.find_by_value('Insurance Payment').id,
    :account_id => option_selector_accounting_account.option_selector_options.find_by_value('Business Checking').id,
    :receivable_id => receivable.id,
    :note      => 'sent to insurance on 1/5/2012' )

  accounting_transaction.practice_id = practice.id
  accounting_transaction.save!

  accounting_transaction = AccountingTransaction.new(
    :invoice_id                 => invoice.id,
    :date_time => '2012-01-03 16:18',
    :income_expense => 'income',
    :amount => 1100,
    :category_id => option_selector_accounting_category_income.option_selector_options.find_by_value('Cash Payment').id,
    :account_id => option_selector_accounting_account.option_selector_options.find_by_value('Cash Reserves').id,
    :note      => 'only had cash' )
  accounting_transaction.practice_id = practice.id
  accounting_transaction.save!











  0.times do
    accounting_transaction = AccountingTransaction.new(
      :date_time => '2012-01-01 10:05',
      :income_expense => 'income',
      :amount => 2198,
      :category_id => option_selector_accounting_category_income.option_selector_options.find_by_value('Credit Card Payment').id,
      :account_id => option_selector_accounting_account.option_selector_options.find_by_value('Business Checking').id,
      :note => 'verify in checking' )
    accounting_transaction.practice_id = practice.id
    accounting_transaction.save!

    accounting_transaction = AccountingTransaction.new(
      :date_time => '2012-01-02 11:32',
      :income_expense => 'expense',
      :amount => 100000,
      :category_id => option_selector_accounting_category_expense.option_selector_options.find_by_value('Rent').id,
      :account_id => option_selector_accounting_account.option_selector_options.find_by_value('Business Checking').id,
      :note => 'Jan 2012' )
    accounting_transaction.practice_id = practice.id
    accounting_transaction.save!

    accounting_transaction = AccountingTransaction.new(
      :date_time => '2012-01-03 13:03',
      :income_expense => 'expense',
      :amount => 3312,
      :category_id => option_selector_accounting_category_expense.option_selector_options.find_by_value('Office Supplies').id,
      :account_id => option_selector_accounting_account.option_selector_options.find_by_value('Cash Reserves').id,
      :note => 'business cards' )
    accounting_transaction.practice_id = practice.id
    accounting_transaction.save!
  end
















end
