# Banking System (JavaScript)

## Overview
This is a console-based banking system built in JavaScript that simulates real-world banking operations with proper validation and transaction safety.

## Features
- Deposit and Withdraw functionality
- Transfer between accounts
- Input validation (invalid account types, negative amounts)
- Atomic transaction handling (rollback mechanism to prevent money loss)
- Transaction history tracking

## Key Concept
The system implements **atomic transactions**, ensuring that a transfer either fully completes or is rolled back to maintain data consistency.

## Example Scenario
If a transfer fails due to an invalid account type:
- Amount is deducted ❌
- System automatically refunds ✅

## How to Run
node bankConsoleApp.js