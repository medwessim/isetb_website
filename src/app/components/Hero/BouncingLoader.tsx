export default function LoadingAnimation() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative flex items-center justify-center w-44 h-44 font-inter text-xl font-light text-white rounded-full bg-transparent select-none">
        {/* Letters */}
        {['G', 'e', 'n', 'e', 'r', 'a', 't', 'i', 'n', 'g'].map((letter, index) => (
          <span
            key={index}
            className="inline-block opacity-40 translate-y-0 rounded-full border-none z-10 animate-loader-letter"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}

        {/* Loader circle */}
        <div className="absolute top-0 left-0 w-full aspect-square rounded-full bg-transparent animate-loader-rotate z-0"></div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');
        
        @keyframes loader-rotate {
          0% {
            transform: rotate(90deg);
            box-shadow:
              0 10px 20px 0 #fff inset,
              0 20px 30px 0 #a855f7 inset,
              0 60px 60px 0 #4f46e5 inset;
          }
          50% {
            transform: rotate(270deg);
            box-shadow:
              0 10px 20px 0 #fff inset,
              0 20px 10px 0 #e11d48 inset,
              0 40px 60px 0 #3730a3 inset;
          }
          100% {
            transform: rotate(450deg);
            box-shadow:
              0 10px 20px 0 #fff inset,
              0 20px 30px 0 #a855f7 inset,
              0 60px 60px 0 #4f46e5 inset;
          }
        }
        
        @keyframes loader-letter-anim {
          0%, 100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          20% {
            opacity: 1;
            transform: scale(1.15);
          }
          40% {
            opacity: 0.7;
            transform: translateY(0);
          }
        }
        
        .animate-loader-rotate {
          animation: loader-rotate 2s linear infinite;
        }
        
        .animate-loader-letter {
          animation: loader-letter-anim 2s infinite;
        }
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}