Promise variable 
- is a variable for a future value, that will be produced by async call

Promise life cycle or states
- 1. pending
- 2. settled: fulfilled/resolved or rejected

Build Promise => Consume Promise

```js
// Consumig Promise 
// NB: don't do nested .then()
fetch('..').then((res) => res.json())
	.then((data) => {
		return fetch('..')
	})
	.then(res => res.json())
	.catch(err => log(error.message)). // global way of handling error that occured anywhere in the chain
	.finally(() => {
		
	})


// NB: not best practice to catch error early inside .then() chain  like
  .then(
	  res => res.json(),
	  error => log(err.message)
	)
	.then((data) => {
		return fetch('..')
	})
	.then(res => res.json())
	
	
// Manually handling error not caught by the chain
fetch('..').then(
	(response) => {
		
		// this will automanically reject the promise
		if(response.okay){
			throw new Error(`Not found: ${respons.status}`)
		}
		
		return response.json()
	})
	.then((data) => {
		return fetch('..')
	})
	.then(res => res.json())
	.catch(err => {. // global way of handling error that occured anywhere in the chain
			log(error.message)  // logs prev message thrown here
	}).
	.finally(() => {
		
	})
```

	  