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

	it('should load infinite elements', () => {
		cy.visit('http://localhost:3000/');
		cy.get('[role="search"] input').type('Test');
		cy.get('[data-testid="PlayArrowIcon"]').wait(2000);
		cy.get('[data-testid="PlayArrowIcon"]').should('exist');

	 // Get the initial length of [data-testid="podcast-row"] elements
		cy.get('[data-testid="podcast-row"]').its('length').then(initialLength => {
	 // Scroll to the last element with [data-testid="podcast-row"] and wait for 5 seconds
	 cy.get('[data-testid="podcast-row"]').last().scrollIntoView().wait(5000);

	 // Get the new length of [data-testid="podcast-row"] elements
	 cy.get('[data-testid="podcast-row"]').its('length').should('be.gt', initialLength);
		});
	})
});