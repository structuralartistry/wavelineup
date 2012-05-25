class AccountingTransactionsController < ApplicationController
  respond_to :json

  def index
    respond_with AccountingTransaction.get_records({ :search       => params[:search],
                                                     :page_size    => params[:page_size],
                                                     :page_number  => params[:page_number],
                                                     :practice_id  => 1 })
  end

  def create
    @accounting_transaction = AccountingTransaction.new(params[:accounting_transaction])
    @accounting_transaction.practice_id = 0
    @accounting_transaction.save
    respond_with @accounting_transaction
  end

  def update
    @accounting_transaction = AccountingTransaction.find(params[:id])
    @accounting_transaction.update_attributes(params[:accounting_transaction])
    respond_with @accounting_transaction
  end

  def destroy
    @accounting_transaction = AccountingTransaction.find(params[:id])
    @accounting_transaction.destroy
    respond_with @accounting_transaction
  end

end
