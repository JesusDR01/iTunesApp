describe('Search podcast', () => {
	it('should search podcast and load the results', () => {
		cy.visit('http://localhost:3000/');
		cy.get('[role="search"] input').type('Test');
		cy.get('[data-testid="PlayArrowIcon"]').should('exist');
	});

	it('should search load list and go back to top podcasts', () => {
		cy.visit('http://localhost:3000/');
		cy.get('[role="search"] input').type('Test');
		cy.get('[data-testid="PlayArrowIcon"]').wait(2000);
		cy.get('[data-testid="PlayArrowIcon"]').should('exist');
		cy.get('[role="search"] input').clear();
		cy.get('[data-testid="PlayArrowIcon"]').wait(2000).should('not.exist');
	});
});