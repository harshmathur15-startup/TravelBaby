# Data Classification

| Class     | Examples                      | Rule                                                        |
| --------- | ----------------------------- | ----------------------------------------------------------- |
| PII       | Name, email, government IDs   | Encrypt at rest, mask in logs                               |
| Financial | Payment amounts, bank details | Never log raw values, access restricted to authorized roles |
| Internal  | Department, job title         | Access restricted to authenticated users                    |
| Public    | Company name, office location | No restrictions                                             |
