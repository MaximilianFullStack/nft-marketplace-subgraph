import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  listingCanceled,
  newListing,
  sale
} from "../generated/Marketplace/Marketplace"

export function createlistingCanceledEvent(
  lister: Address,
  erc721: Address,
  tokenId: BigInt
): listingCanceled {
  let listingCanceledEvent = changetype<listingCanceled>(newMockEvent())

  listingCanceledEvent.parameters = new Array()

  listingCanceledEvent.parameters.push(
    new ethereum.EventParam("lister", ethereum.Value.fromAddress(lister))
  )
  listingCanceledEvent.parameters.push(
    new ethereum.EventParam("erc721", ethereum.Value.fromAddress(erc721))
  )
  listingCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return listingCanceledEvent
}

export function createnewListingEvent(
  lister: Address,
  erc721: Address,
  tokenId: BigInt,
  price: BigInt
): newListing {
  let newListingEvent = changetype<newListing>(newMockEvent())

  newListingEvent.parameters = new Array()

  newListingEvent.parameters.push(
    new ethereum.EventParam("lister", ethereum.Value.fromAddress(lister))
  )
  newListingEvent.parameters.push(
    new ethereum.EventParam("erc721", ethereum.Value.fromAddress(erc721))
  )
  newListingEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  newListingEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return newListingEvent
}

export function createsaleEvent(
  seller: Address,
  buyer: Address,
  erc721: Address,
  tokenId: BigInt,
  salePrice: BigInt
): sale {
  let saleEvent = changetype<sale>(newMockEvent())

  saleEvent.parameters = new Array()

  saleEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  saleEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  saleEvent.parameters.push(
    new ethereum.EventParam("erc721", ethereum.Value.fromAddress(erc721))
  )
  saleEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  saleEvent.parameters.push(
    new ethereum.EventParam(
      "salePrice",
      ethereum.Value.fromUnsignedBigInt(salePrice)
    )
  )

  return saleEvent
}
