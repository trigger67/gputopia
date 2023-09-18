import { updateBalances } from "./update-balances"

export const complete = async (completion: string) => {
  // Fetch POST to complete the inference
  fetch('/api/complete', {
    method: 'POST',
    // @ts-ignore
    headers: {
      'Content-Type': 'application/json',
      // @ts-ignore
    },
    body: JSON.stringify({ result: completion })
  })
    .then(response => response.json())
    .then(data => {
      updateBalances()
    })
    .catch(error => {
      console.error('Error:', error)
    });
}
