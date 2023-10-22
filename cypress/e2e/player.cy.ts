
describe('Player', () => {
	beforeEach(() => {
		//Init the podcast
		cy.visit('http://localhost:3000');
		cy.get('[role="search"] input').type('Test');
		cy.get('[data-testid="play-pause"]').wait(2000);
		cy.get('span[data-testid="play-pause"]')
			.first()
			.click({ force: true })
			.wait(2000);
	});
	it('should play / pause correctly', () => {
		// Capture the initial content
		cy.get('[data-testid="elapsed"]').invoke('text').as('initialContent');

		// Pause podcast
		cy.get('[data-testid="player"] [data-testid="play-pause"]')
			.first()
			.click({ force: true });

		// Check that the content is still the same
		cy.get('@initialContent').then(initialContent => {
			cy.get('[data-testid="elapsed"]')
				.wait(2000)
				.invoke('text')
				.should('eq', initialContent);
		});
	});
	it('Should increase / decrease volume', () => {
		cy.get('[name="volume"]').invoke('val').as('initialVolume');
		cy.get('[name="volume"]')
			.invoke('val', 0.5)
			.trigger('change', { force: true });
		cy.get('[name="volume"]').invoke('val').should('not.eq', '@initialVolume');
	});
	it('Should mute / unmute', () => {
		cy.get('[data-testid="VolumeUpIcon"]').click();
		cy.get('[name="volume"]').invoke('val').should('eq', '0');
		cy.get('[data-testid="VolumeOffIcon"]').click();
		cy.get('[name="volume"]').invoke('val').should('eq', '0.3');
	});
	it('Should go to next / previous podcast', () => {
		cy.get('[data-testid="next"]').click().wait(5000);
		cy.get(
			'[data-testid="podcast-row"] ~ [data-testid="podcast-row"] [data-testid="PauseIcon"] ',
		).should('exist');
		cy.get('[data-testid="prev"]').click().wait(2000);
		cy.get(
			'[data-testid="podcast-row"] ~ [data-testid="podcast-row"] [data-testid="PauseIcon"] ',
		).should('not.exist');
	});
	it('Should enable / disable random mode', () => {
		cy.get('[data-testid="random"]').click();
		cy.get('[data-testid="next"]').click().wait(5000);

		//Get second podcast
		cy.get('[data-testid="podcast-row"]')
			.eq(1)
			.find('[data-testid="PauseIcon"]')
			.should('not.exist');

		// Get podcast playing
		cy.get(
			'[data-testid="podcast-row"] ~ [data-testid="podcast-row"] [data-testid="PauseIcon"] ',
		).should('exist'); // Could be a very small possibility that the next podcast is the same as the current one
	});
	it('Should enable / disable loop mode', () => {
		cy.get('[data-testid="loop"]').click();
		cy.get('[data-testid="loop"]').click();

		cy.get('audio').then($audio => {
			const duration = $audio[0].duration;
			cy.get('audio')
				.invoke('prop', 'currentTime', duration - 1)
				.wait(10000);
			cy.get('audio').invoke('prop', 'currentTime').should('be.lt', 15000);
		});
	});
});
