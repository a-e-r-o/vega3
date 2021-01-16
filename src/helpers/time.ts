export class timeUtils {
	static getFormattedTime(date: Date = new Date(), withSeconds: boolean = true) {
		let nowHours: string = date.getHours().toString();
		if (date.getHours() < 10)
		nowHours = '0' + nowHours;
		
		let nowMinutes: string = date.getMinutes().toString();
		if (date.getMinutes() < 10)
			nowMinutes = '0' + nowMinutes;

		let result = nowHours + ':' + nowMinutes

		if (withSeconds) {
			let nowSeconds: string = date.getSeconds().toString();
			if (date.getSeconds() < 10)
				nowSeconds = '0' + nowSeconds;
			result += ':' + nowSeconds;
		}

		return result;
	}

	static getFormattedDate(date: Date = new Date(), withYear: boolean = true, separator = '-'): string {
		let nowDays: string = date.getDate().toString();
		if (date.getDate() < 10)
			nowDays = '0' + nowDays.toString()

		let nowMonth: string = (date.getMonth() + 1).toString();
		if (date.getMonth()+1 < 10)
			nowMonth = '0' + nowMonth.toString()

		let result: string = nowDays + separator + nowMonth;

		if (withYear){
			let nowYear = date.getFullYear().toString().substr(-2);
			result += separator + nowYear;
		}

		return result;
	}

	static getFormattedTimeDiff(date1: Date, date2: Date) {
		let msDiff: number = Math.abs(date1.getTime() - date2.getTime());

		let daysDiff: number = Math.floor(msDiff / (1000 * 60 * 60 * 24));
		msDiff -= (daysDiff * 1000 * 60 * 60 * 24);

		let hoursDiff: number = Math.floor(msDiff / (1000 * 60 * 60));
		msDiff -= (hoursDiff * 1000 * 60 * 60);

		let minutesDiff: number = Math.floor(msDiff / (1000 * 60));
		msDiff -= (minutesDiff * 1000 * 60);

		let secondsDiff: number = Math.floor(msDiff / (1000));

		let diff: any = {
			days: daysDiff,
			hours: hoursDiff,
			minutes: minutesDiff,
			seconds: secondsDiff
		}

		let diffStr: string = '';

		if (diff.days)
			diffStr += diff.days + 'd '

		if (diff.hours)
			diffStr += diff.hours + 'h '

		if (diff.minutes)
			diffStr += diff.minutes + 'm '

		if (diff.seconds)
			diffStr += diff.seconds + 's'

		return diffStr;
	}

	static addMinutes(date: Date, minutes: number): Date {
		return new Date(date.getTime() + minutes * 60000);
	}

	static msToNextStep(minStep: number, now: Date): number {
		let nextStep: number = 0;

		while (true) {
			nextStep += minStep;
			if (nextStep > now.getMinutes()) {
				break
			}
		}

		// If step must occur in the next hour
		if (now.getMinutes() > nextStep || now.getMinutes() == 0) {
			return 3600000 - new Date().getTime() % 3600000;
		}

		// The beginning of the current hour
		let nowOClockMs: number = now.getTime() - now.getMinutes() * 1000 * 60 - now.getSeconds() * 1000;
		// Delta in ms between now and tergeted minute
		let delta: number = (nowOClockMs + nextStep * 1000 * 60) - now.getTime();

		return delta;
	}
};