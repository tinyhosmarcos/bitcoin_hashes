class BlocksController < ApplicationController
  before_action :set_block, only: %i[ show edit update destroy ]

  # GET /blocks or /blocks.json
  def index
    filtered = Block.all.order("created_at DESC")
    @pagy, @blocks = pagy(filtered, items: 3)
  end

  # GET /blocks/1 or /blocks/1.json
  def show
  end

  # GET /blocks/new
  def new
    @block = Block.new
  end

  # GET /blocks/1/edit
  def edit
  end

  # POST /blocks or /blocks.json
  def create
    @block = Block.new(block_params)

    respond_to do |format|
      if @block.save
        format.turbo_stream { render partial: "blocks/create", locals: { block: @block } }
        format.html {  }
        #format.json { render :show, status: :created, location: @block }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @block.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /blocks/1 or /blocks/1.json
  def update
    respond_to do |format|
      if @block.update(block_params)
        format.html { redirect_to block_url(@block), notice: "Block was successfully updated." }
        format.json { render :show, status: :ok, location: @block }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @block.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /blocks/1 or /blocks/1.json
  def destroy
    @block.destroy

    respond_to do |format|
      format.turbo_stream { render turbo_stream: turbo_stream.remove(@block) }
      format.html { redirect_to blocks_url, notice: "Block was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_block
      @block = Block.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def block_params
      params.require(:block).permit(:hash_id, :prev_block, :block_index, :time, :bits)
    end
end
