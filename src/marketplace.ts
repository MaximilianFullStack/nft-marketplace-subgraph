import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  Marketplace,
  listingCanceled,
  newListing,
  sale,
} from "../generated/Marketplace/Marketplace";
import {
  ActiveItem,
  NewListing,
  ListingCancled,
  Sale,
} from "../generated/schema";

export function handlelistingCanceled(event: listingCanceled): void {
  let listingCanceled = ListingCancled.load(
    getIdFromEventParams(event.params.erc721, event.params.tokenId)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.erc721, event.params.tokenId)
  );
  if (!listingCanceled) {
    listingCanceled = new ListingCancled(
      getIdFromEventParams(event.params.erc721, event.params.tokenId)
    );
  }

  listingCanceled.seller = event.params.lister;
  listingCanceled.erc721 = event.params.erc721;
  listingCanceled.tokenId = event.params.tokenId;
  activeItem!.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  listingCanceled.save();
  activeItem!.save();
}

export function handlenewListing(event: newListing): void {
  let newListing = NewListing.load(
    getIdFromEventParams(event.params.erc721, event.params.tokenId)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.erc721, event.params.tokenId)
  );
  if (!newListing) {
    newListing = new NewListing(
      getIdFromEventParams(event.params.erc721, event.params.tokenId)
    );
  }
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.erc721, event.params.tokenId)
    );
  }
  newListing.seller = event.params.lister;
  activeItem.seller = event.params.lister;

  newListing.erc721 = event.params.erc721;
  activeItem.erc721 = event.params.erc721;

  newListing.tokenId = event.params.tokenId;
  activeItem.tokenId = event.params.tokenId;

  newListing.price = event.params.price;
  activeItem.price = event.params.price;

  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  newListing.save();
  activeItem.save();
}

export function handlesale(event: sale): void {
  let sale = Sale.load(
    getIdFromEventParams(event.params.erc721, event.params.tokenId)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.erc721, event.params.tokenId)
  );
  if (!sale) {
    sale = new Sale(
      getIdFromEventParams(event.params.erc721, event.params.tokenId)
    );
  }
  sale.buyer = event.params.buyer;
  sale.seller = event.params.seller;
  sale.erc721 = event.params.erc721;
  sale.tokenId = event.params.tokenId;
  sale.price = event.params.salePrice;
  activeItem!.buyer = event.params.buyer;

  sale.save();
  activeItem!.save();
}

function getIdFromEventParams(erc721: Address, tokenId: BigInt): string {
  return tokenId.toHexString() + erc721.toHexString();
}
