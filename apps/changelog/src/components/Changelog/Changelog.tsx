import { SocialLinks } from "@lightdotso/const";

import { NotionImage } from "@lightdotso/changelog/components/NotionImage";
import { leftNumberPad } from "@lightdotso/changelog/utils/leftNumberPad";

export const Changelog = ({ posts }) => {
  return (
    <div className="mx-auto max-w-2xl px-3">
      <div className="mt-16">
        <h3 className="text-5xl font-extrabold text-contrast-higher">
          Changelog
        </h3>
        <p className="mt-8 text-contrast-medium">
          Follow along with updates and changes made to Light.
        </p>
        <div className="mt-3">
          <a
            href={SocialLinks.Twitter}
            className="font-extrabold text-contrast-high underline hover:text-contrast-medium"
            target="_blank"
            rel="noreferrer"
          >
            Follow us on Twitter
          </a>
        </div>
      </div>
      <div className="my-12 flex flex-col space-y-8">
        {posts.map(post => {
          const date = new Date(post.date).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });
          return (
            <a
              key={post.id}
              href={`https://mirror.xyz/lightdotso.eth/${post.digest}`}
              className="group"
              target="_blank"
              rel="noreferrer"
            >
              <div className="aspect-w-16 aspect-h-9 duration-1000 hover:opacity-80">
                <NotionImage src={post.cover.external.url} alt={post.id} />
              </div>
              <div className="mt-6 w-full items-start justify-between">
                <div className="flex w-full justify-between">
                  <h3 className="text-base font-bold text-contrast-medium group-hover:text-contrast-low sm:text-lg">
                    Changelog #{leftNumberPad(post.number)}
                  </h3>
                  <h3 className="text-base text-contrast-medium group-hover:text-contrast-low sm:text-lg">
                    {date}
                  </h3>
                </div>
                <h3 className="mt-3 text-xl font-bold text-contrast-higher group-hover:text-contrast-high sm:text-3xl">
                  {post.name}
                </h3>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
