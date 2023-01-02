import React from 'react'
import App from './App'
import TeamInfo from './Component/TeamInfo'
import Nba from './Nba'

describe('search', () => {
  it('renders', () => {
    cy.mount(<App />)
    cy.wait(500)
    cy.get('.searchInput').focus()
    cy.wait(500)
    cy.get('.searchInput').type("hawks")
    cy.wait(2000)
  })
})

describe('rowClick', () => {
  it('renders', () => {
    cy.mount(<App />)
    cy.wait(500)
    cy.get('#row-1').click()
    cy.wait(2000)
  })
})