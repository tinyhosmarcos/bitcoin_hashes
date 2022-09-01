import { Controller } from "@hotwired/stimulus"
import apiFetch from "../services/api-fetch";

// Connects to data-controller="block"
export default class extends Controller {
  static targets = [ "hash" ]
  hash_data_url = "https://blockchain.info/rawblock"
  
  async submit() {	
    const hash_data = await apiFetch(this.hash_data_url, this.hashTarget.value, false, { method: "GET" });
    // destructuring hash_data to hash, prev_block, block_index, time, bits
    const { hash, prev_block, block_index, time, bits } = hash_data;
    const response = await apiFetch("", "blocks", true, {
      headers: { "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content },
      method: "POST",
      body: { hash_id: hash, prev_block: prev_block, block_index: block_index, time: time, bits: bits }
    })
    console.log(response);
    await Turbo.renderStreamMessage(response);
  }

}
