describe('Replay podcast', () => {
	it('Should replay podcast from search', () => {
		cy.visit('http://localhost:3000/');
		cy.get('[role="search"] input').type('Test');
		cy.get('[data-testid="play-pause"]').wait(4000);
		cy.get('span[data-testid="play-pause"]').first().click();
		cy.get('audio').should('exist');
		cy.get('[data-testid="duration"]').wait(2000).should('not.contain', '00:00');
	});

	it('Should replay podcast from specific podcast', () => {
		cy.visit('http://localhost:3000/');
		cy.get('[data-testid="podcast-link"]').first().click();
		cy.get('[data-testid="play-pause"]').wait(2000);
		cy.get('span[data-testid="play-pause"]').first().click({ force: true });
		cy.get('audio').should('exist');
		cy.get('[data-testid="duration"]').wait(2000).should('not.contain', '00:00');
	});
});

