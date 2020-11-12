import React from 'react';
import { Drizzle, generateStore } from "@drizzle/store";

// import drizzle functions and contract artifact
import PotOfGreed from "../../contracts/PotOfGreed.json";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [PotOfGreed],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
};

// setup the drizzle store and drizzle
const drizzle = new Drizzle(options)

export const DrizzleCtx = React.createContext()

export default function DrizzleProvider ({ children }) {
  const [drizzleState, setDrizzleState] = React.useState({ loading: true, drizzleState: null })

  React.useEffect(() => {
    const unmountDrizzle = drizzle.store.subscribe( () => {
      const drizzleState = drizzle.store.getState()

      if (drizzleState.drizzleStatus.initialized) {
        setDrizzleState({ loading: false, drizzleState })
      }
    })
    return () => {
      unmountDrizzle()
    }
  }, [])

  return <DrizzleCtx.Provider value={{drizzle, drizzleState}}>
    {children}
  </ DrizzleCtx.Provider>
}
