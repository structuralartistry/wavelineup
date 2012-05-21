class AccountingTransaction < ActiveRecord::Base
  belongs_to :practice
  belongs_to :invoice

  belongs_to :accounting_category, :class_name => 'OptionSelectorOption', :foreign_key => :accounting_category_id
  belongs_to :accounting_account, :class_name => 'OptionSelectorOption', :foreign_key => :accounting_account_id

  attr_accessible :date_time, :invoice_id, :income_expense, :accounting_account_id, :amount, :amount, :accounting_category_id, :date, :note, :receivable_id

  validates :date_time, :practice_id, :income_expense, :amount, :accounting_category_id, :accounting_account_id, :presence => true


  scope :paginate, lambda { |options={}|
    page_size = options[:page_size] || 15
    page_number = options[:page_number] || 1
    offset_records = 0
    if page_number != 1
      offset_records = (page_size.to_i * page_number.to_i) - page_size.to_i
    end

    AccountingTransaction.limit(page_size).offset(offset_records).order('date_time DESC')
  }

  scope :search, lambda { |search_string=nil|
    if search_string

      # preprocess for amount (convert decimal to integer for matching
      search_string =~ /\$?\d{1,}\.\d{0,}/
      amount = $& || nil
      if amount
        amount = $&.delete('$.')
        search_string.gsub(amount,'').gsub('  ',' ')
      end

      # change colon to double dash for matching time, the colon messes up the AR interpolation
      search_string.gsub!(/:/, '--')

      accounting_transactions = AccountingTransaction.joins('LEFT OUTER JOIN option_selector_options AS accounting_categories ON accounting_category_id = accounting_categories.id
                                                             LEFT OUTER JOIN option_selector_options AS accounting_accounts ON accounting_account_id = accounting_accounts.id')
                                                     .where("accounting_categories.value ILIKE :s
                                                             OR accounting_accounts.value ILIKE :s
                                                             OR CAST(amount AS VARCHAR) ILIKE :a
                                                             OR TO_CHAR(date_time, 'YYYY-MM-DD HH24--MI ') ILIKE :s
                                                             OR income_expense ILIKE :s
                                                             OR CAST(invoice_id AS VARCHAR) ILIKE :s
                                                             OR note ILIKE :s", :s => "%#{search_string}%", :a => "%#{amount || ' '}%")
    else
      accounting_transactions = AccountingTransaction.all
    end
    accounting_transactions
  }

end
