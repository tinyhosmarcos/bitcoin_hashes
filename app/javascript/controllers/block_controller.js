import { Controller } from "@hotwired/stimulus"
import apiFetch from "../services/api-fetch";

// Connects to data-controller="block"
export default class extends Controller {
  static targets = [ "hash" ]
  hash_data_url = "https://blockchain.info/rawblock"
  
  // Only allow numbers and letters
  input(event) {  
    const regex = new RegExp("^[a-zA-Z0-9]+$");
    if (!regex.test(event.target.value)) {
      event.target.value = event.target.value.slice(0, -1);
    }
  }

  // Fetch the block data from the Bitcoin API and send it to the server
  async submit() {	
    const hash_data = await apiFetch(this.hash_data_url, this.hashTarget.value, false, { method: "GET" });
    
    if (hash_data !== 404) {
      // destructuring hash_data to hash, prev_block, block_index, time, bits
      const { hash, prev_block, block_index, time, bits } = hash_data;
      
      const response = await apiFetch("", "blocks", true, {
        headers: { "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content },
        method: "POST",
        body: { hash_id: hash, prev_block: prev_block, block_index: block_index, time: time, bits: bits }
      })
      
      if (response !== 422) {
        console.log("Block created");
        await Turbo.renderStreamMessage(response);
      }
    }
  }
}
