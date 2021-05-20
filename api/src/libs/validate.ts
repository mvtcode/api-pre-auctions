import { response } from "express";

const Web3 = require('web3');
const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
const { hexToU8a, isHex } = require('@polkadot/util');
const {verify} = require('hcaptcha');

export const isEmail = email => {
  if (typeof email !== 'string') return false;
  const reg = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\\']+(\\.[^<>()[\\]\\\\.,;:\\s@\\\']+)*)|(\\\'.+\\\'))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
  return reg.test(email);
};

export const isPolkadotAddress = address => {
	try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
    return true;
  } catch (error) {
    return false;
  }
}

export const isUUIDv4 = uuid => {
	const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
	return uuidV4Regex.test(uuid);
}

export const isAddress = address => {
	return Web3.utils.isAddress(address);
}

export const validateHCaptcha = async code => {
	try {
		const res = await verify(process.env.HCAPTCHA_SECRET, code);
		return res.success;
	} catch (e) {
		console.error(e);
		return false;
	}
}