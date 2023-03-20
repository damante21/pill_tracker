[
    {
      nlmDisclaimer:
        "It is not the intention of NLM to provide specific medical advice, but rather to provide users with information to better understand their health and their medications. NLM urges you to consult with a qualified physician for advice about medications.",
      fullInteractionTypeGroup: [
        {
          sourceDisclaimer:
            "DrugBank is intended for educational and scientific research purposes only and you expressly acknowledge and agree that use of DrugBank is at your sole risk. The accuracy of DrugBank information is not guaranteed and reliance on DrugBank shall be at your sole risk. DrugBank is not intended as a substitute for professional medical advice, diagnosis or treatment..[www.drugbank.ca]",
          sourceName: "DrugBank",
          fullInteractionType: [
            {
              comment:
                "Drug1 (rxcui = 152923, name = simvastatin 40 MG Oral Tablet [Zocor], tty = SBD). Drug2 (rxcui = 207106, name = fluconazole 50 MG Oral Tablet [Diflucan], tty = SBD). Drug1 is resolved to simvastatin, Drug2 is resolved to fluconazole and interaction asserted in DrugBank between Simvastatin and Fluconazole.",
              minConcept: [
                {
                  rxcui: "152923",
                  name: "simvastatin 40 MG Oral Tablet [Zocor]",
                  tty: "SBD",
                },
                {
                  rxcui: "207106",
                  name: "fluconazole 50 MG Oral Tablet [Diflucan]",
                  tty: "SBD",
                },
              ],
              interactionPair: [
                {
                  interactionConcept: [
                    {
                      minConceptItem: {
                        rxcui: "36567",
                        name: "simvastatin",
                        tty: "IN",
                      },
                      sourceConceptItem: {
                        id: "DB00641",
                        name: "Simvastatin",
                        url: "https://go.drugbank.com/drugs/DB00641#interactions",
                      },
                    },
                    {
                      minConceptItem: {
                        rxcui: "4450",
                        name: "fluconazole",
                        tty: "IN",
                      },
                      sourceConceptItem: {
                        id: "DB00196",
                        name: "Fluconazole",
                        url: "https://go.drugbank.com/drugs/DB00196#interactions",
                      },
                    },
                  ],
                  severity: "N/A",
                  description:
                    "The metabolism of Simvastatin can be decreased when combined with Fluconazole.",
                },
              ],
            },
            {
              comment:
                "Drug1 (rxcui = 152923, name = simvastatin 40 MG Oral Tablet [Zocor], tty = SBD). Drug2 (rxcui = 656659, name = bosentan 125 MG Oral Tablet, tty = SCD). Drug1 is resolved to simvastatin, Drug2 is resolved to bosentan and interaction asserted in DrugBank between Simvastatin and Bosentan. Drug1 is resolved to simvastatin, Drug2 is resolved to bosentan anhydrous and interaction asserted in DrugBank between Simvastatin and Bosentan.",
              minConcept: [
                {
                  rxcui: "152923",
                  name: "simvastatin 40 MG Oral Tablet [Zocor]",
                  tty: "SBD",
                },
                {
                  rxcui: "656659",
                  name: "bosentan 125 MG Oral Tablet",
                  tty: "SCD",
                },
              ],
              interactionPair: [
                {
                  interactionConcept: [
                    {
                      minConceptItem: {
                        rxcui: "36567",
                        name: "simvastatin",
                        tty: "IN",
                      },
                      sourceConceptItem: {
                        id: "DB00641",
                        name: "Simvastatin",
                        url: "https://go.drugbank.com/drugs/DB00641#interactions",
                      },
                    },
                    {
                      minConceptItem: {
                        rxcui: "1468845",
                        name: "bosentan anhydrous",
                        tty: "PIN",
                      },
                      sourceConceptItem: {
                        id: "DB00559",
                        name: "Bosentan",
                        url: "https://go.drugbank.com/drugs/DB00559#interactions",
                      },
                    },
                  ],
                  severity: "N/A",
                  description:
                    "The serum concentration of Simvastatin can be decreased when it is combined with Bosentan.",
                },
                {
                  interactionConcept: [
                    {
                      minConceptItem: {
                        rxcui: "36567",
                        name: "simvastatin",
                        tty: "IN",
                      },
                      sourceConceptItem: {
                        id: "DB00641",
                        name: "Simvastatin",
                        url: "https://go.drugbank.com/drugs/DB00641#interactions",
                      },
                    },
                    {
                      minConceptItem: {
                        rxcui: "75207",
                        name: "bosentan",
                        tty: "IN",
                      },
                      sourceConceptItem: {
                        id: "DB00559",
                        name: "Bosentan",
                        url: "https://go.drugbank.com/drugs/DB00559#interactions",
                      },
                    },
                  ],
                  severity: "N/A",
                  description:
                    "The serum concentration of Simvastatin can be decreased when it is combined with Bosentan.",
                },
              ],
            },
            {
              comment:
                "Drug1 (rxcui = 207106, name = fluconazole 50 MG Oral Tablet [Diflucan], tty = SBD). Drug2 (rxcui = 656659, name = bosentan 125 MG Oral Tablet, tty = SCD). Drug1 is resolved to fluconazole, Drug2 is resolved to bosentan and interaction asserted in DrugBank between Fluconazole and Bosentan. Drug1 is resolved to fluconazole, Drug2 is resolved to bosentan anhydrous and interaction asserted in DrugBank between Fluconazole and Bosentan.",
              minConcept: [
                {
                  rxcui: "207106",
                  name: "fluconazole 50 MG Oral Tablet [Diflucan]",
                  tty: "SBD",
                },
                {
                  rxcui: "656659",
                  name: "bosentan 125 MG Oral Tablet",
                  tty: "SCD",
                },
              ],
              interactionPair: [
                {
                  interactionConcept: [
                    {
                      minConceptItem: {
                        rxcui: "4450",
                        name: "fluconazole",
                        tty: "IN",
                      },
                      sourceConceptItem: {
                        id: "DB00196",
                        name: "Fluconazole",
                        url: "https://go.drugbank.com/drugs/DB00196#interactions",
                      },
                    },
                    {
                      minConceptItem: {
                        rxcui: "1468845",
                        name: "bosentan anhydrous",
                        tty: "PIN",
                      },
                      sourceConceptItem: {
                        id: "DB00559",
                        name: "Bosentan",
                        url: "https://go.drugbank.com/drugs/DB00559#interactions",
                      },
                    },
                  ],
                  severity: "N/A",
                  description:
                    "The metabolism of Bosentan can be decreased when combined with Fluconazole.",
                },
                {
                  interactionConcept: [
                    {
                      minConceptItem: {
                        rxcui: "4450",
                        name: "fluconazole",
                        tty: "IN",
                      },
                      sourceConceptItem: {
                        id: "DB00196",
                        name: "Fluconazole",
                        url: "https://go.drugbank.com/drugs/DB00196#interactions",
                      },
                    },
                    {
                      minConceptItem: {
                        rxcui: "75207",
                        name: "bosentan",
                        tty: "IN",
                      },
                      sourceConceptItem: {
                        id: "DB00559",
                        name: "Bosentan",
                        url: "https://go.drugbank.com/drugs/DB00559#interactions",
                      },
                    },
                  ],
                  severity: "N/A",
                  description:
                    "The metabolism of Bosentan can be decreased when combined with Fluconazole.",
                },
              ],
            },
          ],
        },
        {
          sourceDisclaimer:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3422823/",
          sourceName: "ONCHigh",
          fullInteractionType: [
            {
              comment:
                "Drug1 (rxcui = 152923, name = simvastatin 40 MG Oral Tablet [Zocor], tty = SBD). Drug2 (rxcui = 207106, name = fluconazole 50 MG Oral Tablet [Diflucan], tty = SBD). Drug1 is resolved to simvastatin, Drug2 is resolved to fluconazole and interaction asserted in ONCHigh between simvastatin and fluconazole.",
              minConcept: [
                {
                  rxcui: "152923",
                  name: "simvastatin 40 MG Oral Tablet [Zocor]",
                  tty: "SBD",
                },
                {
                  rxcui: "207106",
                  name: "fluconazole 50 MG Oral Tablet [Diflucan]",
                  tty: "SBD",
                },
              ],
              interactionPair: [
                {
                  interactionConcept: [
                    {
                      minConceptItem: {
                        rxcui: "36567",
                        name: "simvastatin",
                        tty: "IN",
                      },
                      sourceConceptItem: {
                        id: "NA",
                        name: "simvastatin",
                        url: "NA",
                      },
                    },
                    {
                      minConceptItem: {
                        rxcui: "4450",
                        name: "fluconazole",
                        tty: "IN",
                      },
                      sourceConceptItem: {
                        id: "NA",
                        name: "fluconazole",
                        url: "NA",
                      },
                    },
                  ],
                  severity: "high",
                  description:
                    "HMG Co-A reductase inhibitors - CYP3A4 inhibitors",
                },
              ],
            },
          ],
        },
      ],
    },
  ];