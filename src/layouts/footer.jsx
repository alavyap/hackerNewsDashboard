export const Footer = () => {
    return (
        <footer className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <p className="text-base font-medium text-slate-900 dark:text-slate-50">© 2025 Alavya Pandey All Rights Reserved</p>
            <div className="flex flex-wrap gap-x-2">
                <a
                    href="https://github.com/alavyap"
                    className="link"
                    target="_blank"
                >
                    Github
                </a>
                <a
                    href="https://www.linkedin.com/in/alavyapandey"
                    className="link"
                    target="_blank"
                >
                    LinkedIn
                </a>
            </div>
        </footer>
    );
};
